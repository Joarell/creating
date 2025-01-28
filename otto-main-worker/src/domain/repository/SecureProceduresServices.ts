import { z } from "zod"
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";
import { NewUser, UserInfoEntityData, UserLogin } from "./models/userData";
import { scryptSync, randomBytes } from "crypto";

const salt = z.string();
const pass = z.string();

type Salt = z.infer<typeof salt>;
type Pass = z.infer<typeof pass>;


/**
* @class executes all secure verifications over the user.
*/
export default class SecurityProceduresServices {
	private readonly userData: UserInfoEntityData;
	private readonly bindings: Context;
	private userLogin: UserLogin;

	constructor(user: UserInfoEntityData, request: Context) {
		this.userData = user;
		this.bindings = request;
	};

	/**
	* @method starts the encryption process
	*/
	private async passEncryptProcedures(): Promise<string | boolean> {
		try {
			const salt =	randomBytes(20).toString('hex');
			const hashed =	this.encryptPassFrase(salt) + salt;
			return(hashed)
		}
		catch(e) {
			console.error(`Pass encryption failed: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the encryption process.
	* @param pass the user passFrase.
	* @param salt the increment string for adding to the passFrase.
	*/
	private encryptPassFrase(salt: Salt): string {
		return(scryptSync(this.userLogin.passFrase, salt, 32).toString('hex'));
	};

	/**
	* @method reverse de encryption process.
	* @param hash sotored passFrase encrypted.
	*/
	private decryptChecker(): boolean {
		const salt =				this.userData.pass_frase.slice(64);
		const originalPassHash =	this.userData.pass_frase.slice(0, 64);
		const currentPassHash =		this.encryptPassFrase(salt);

		return(originalPassHash === currentPassHash);
	};

	/**
	* @method generate the authorization token.
	* @param [role="user"] the level of access granted to the user
	*/
	async authTokenGen(role: string = "user"): Promise<string> {
		const exp: number = ~~((Date.now() / 1000) + 3600 * 8);
		const payload = { sub: this.userData.name, role, exp };

		try{
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e)
			return('Auth token Error!');
		};
	};

	/**
	* @method generate the refresh token.
	* @param [role="user"] the level of access granted to the user
	*/
	async refTokenGen(role: string = "user"): Promise<string> {
		const payload = { sub: this.userData.email, role };

		try {
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.REF_SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e);
			return('REF Token Error!');
		};
	};

	/**
	* @method verify the user authorization.
	*/
	get loginChecker() {
		return (this.userData !== undefined ? this.decryptChecker(): false);
	};

	/**
	* @field stats the encryption pass frase.
	*/
	get encryptPass() {
		return (this.passEncryptProcedures());
	};

	set userLoginData(data: UserLogin) {
		this.userLogin = data;
	};
};


/**
* @class executes all secure verifications over the new user.
*/
export class NewUserSecurityProceduresServices {
	private newUser: NewUser
	private readonly bindings: Context;

	constructor(request: Context, user: NewUser) {
		this.newUser =	user;
		this.bindings =	request;
	};

	/**
	* @method starts the encryption process
	*/
	private async passEncryptProcedures(): Promise<string | boolean> {
		try {
			const salt =	randomBytes(20).toString('hex');
			const { passFrase } = this.newUser;
			const hashed =	this.encryptPassFrase(passFrase, salt) + salt;

			return(hashed)
		}
		catch(e) {
			console.error(`Pass encryption failed: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the encryption process.
	* @param pass the user passFrase.
	* @param salt the increment string for adding to the passFrase.
	*/
	private encryptPassFrase(pass: Pass, salt: Salt): string {
		return(scryptSync(pass, salt, 32).toString('hex'));
	};

	/**
	* @method generate the authorization token.
	* @param [role="user"] the level of access granted to the user
	*/
	async authTokenGen(role: string = "user"): Promise<string> {
		const exp: number = ~~((Date.now() / 1000) + 3600 * 8);
		const payload = { sub: this.newUser.userName, role, exp };

		try{
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e)
			return('Auth token Error!');
		};
	};

	/**
	* @method generate the refresh token.
	* @param [role="user"] the level of access granted to the user
	*/
	async refTokenGen(role: string = "user"): Promise<string> {
		const payload = { sub: this.newUser.email, role };

		try {
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.REF_SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e);
			return('REF Token Error!');
		};
	};

	/**
	* @field stats the encryption pass frase.
	*/
	get encryptPass() {
		return (this.passEncryptProcedures());
	};
};
