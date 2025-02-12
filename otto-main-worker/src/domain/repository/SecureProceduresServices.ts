import { z } from "zod"
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";
import { NewUser, UserActiveData, UserDataRequest, UserInfoEntityData, UserLogin } from "./models/userData";
import { scryptSync, randomBytes } from "crypto";
import { CommandDB } from "./ClassCommandDB";
import { JWTPayload } from "hono/utils/jwt/types";

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
			const hashed =	this.encryptPassPhrase(salt) + salt;
			return(hashed)
		}
		catch(e) {
			console.error(`Pass encryption failed: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the encryption process.
	* @param pass the user passPhrase.
	* @param salt the increment string for adding to the passPhrase.
	*/
	private encryptPassPhrase(salt: Salt): string {
		return(scryptSync(this.userLogin.passPhrase, salt, 32).toString('hex'));
	};

	/**
	* @method reverse de encryption process.
	* @param hash sotored passPhrase encrypted.
	*/
	private decryptChecker(): boolean {
		const salt =				this.userData.pass_phrase.slice(64);
		const originalPassHash =	this.userData.pass_phrase.slice(0, 64);
		const currentPassHash =		this.encryptPassPhrase(salt);

		return(originalPassHash === currentPassHash);
	};

	/**
	* @method generate the authorization token.
	* @param [role="user"] the level of access granted to the user
	*/
	async authTokenGen(role: string = "user"): Promise<string> {
		const exp: number = ~~((Date.now() / 1000) + 3600 * 8);
		const alg: string = 'HS512';
		const payload: JWTPayload = { sub: this.userData.name, role, exp };

		try{
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.SECRET_TOKEN,
				alg
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
		const exp: number = ~~((Date.now() / 1000) + 3600);
		const alg: string = 'HS512';
		const payload = { sub: this.userData.name, role, exp };

		try {
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.REF_SECRET_TOKEN,
				alg
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
	* @field stats the encryption pass phrase.
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
			const { passPhrase } = this.newUser;
			const hashed =	this.encryptPassPhrase(passPhrase, salt) + salt;

			return(hashed)
		}
		catch(e) {
			console.error(`Pass encryption failed: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the encryption process.
	* @param pass the user passPhrase.
	* @param salt the increment string for adding to the passPhrase.
	*/
	private encryptPassPhrase(pass: Pass, salt: Salt): string {
		return(scryptSync(pass, salt, 32).toString('hex'));
	};

	/**
	* @method generate the authorization token.
	* @param [role="user"] the level of access granted to the user
	*/
	async authTokenGen(role: string = "user"): Promise<string> {
		//const exp: number = ~~((Date.now() / 1000) + 3);
		const alg: string = 'HS512';
		const exp: number = 1;
		const payload = { sub: this.newUser.userName, role, exp };

		try{
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.SECRET_TOKEN,
				alg
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
		//const exp: number = ~~((Date.now() / 1000) + 3);
		const exp: number = 1;
		const alg: string = 'HS512';
		const payload = { sub: this.newUser.email, role, exp };

		try {
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.REF_SECRET_TOKEN,
				alg
			);
			return(authToken);
		}
		catch(e){
			console.error(e);
			return('REF Token Error!');
		};
	};

	/**
	* @field stats the encryption pass phrase.
	*/
	get encryptPass() {
		return (this.passEncryptProcedures());
	};
};


/**
* @class It used to check if all tokens is valid.
*/
export class TokenPairsValidator {
	private readonly bindings: Context;

	/**
	* @param request cloudFlare/hono bindings for accessing the request, KV, D1 and environment variables.
	*/
	constructor(request: Context) {
		this.bindings = request;
	};

	/**
	* @method executes the JWT verifications to each token.
	* @param user object with all tokens needed.
	*/
	async refreshTokenChecker(user: UserActiveData): Promise<boolean | number> {
		try {
			const time: number = Date.now();
			const alg = 'HS512';
			const check = await Jwt.verify(user.refToken, this.bindings.env.REF_SECRET_TOKEN, alg);

			return(check.exp && check.exp > time ? true : 403);
		}
		catch(e){
			console.error(e)
			return(false)
		};
	};

	/**
	* @method executes the JWT verifications to each token.
	* @param user object with all tokens needed.
	*/
	async authTokenChecker(user: UserActiveData): Promise<boolean | number> {
		const commandDB = new CommandDB(this.bindings);

		try {
			const time: number = Date.now().toString().length <= 10 ?
				Date.now(): ~~(Date.now() / 1000);
			const alg = 'HS512';
			const check = await Jwt.verify(user.authToken, this.bindings.env.SECRET_TOKEN, alg);

			if (check.exp && check.exp >= time)
				return(true)
			throw new Error();
		}
		catch(e){
			console.error(e)
			await commandDB.storeSuspiciousTokens(user);
			return(403)
		};
	}
};
