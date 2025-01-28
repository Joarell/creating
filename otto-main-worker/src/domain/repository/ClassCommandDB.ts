import { iCommandDBServiceEstimates, iCommandDBService } from "./models/CommandRepository";
import { UserInfoEntityData, UserActiveData, NewUser, UserLogin } from "./models/userData";
import { SolvedList } from "./models/EstimateType";
import { Context } from "hono";
import { randomBytes } from "crypto";
import SecurityProceduresServices, { NewUserSecurityProceduresServices } from "./SecureProceduresServices";
import { QueryDBService } from "./ClassQueryDB";


/**
* @class commands to be executed by the Service class to NOT active users.
*/
export class CommandDB implements iCommandDBService {
	private readonly bindings: Context;

	/**
	* @constructor basic information to operate the commands on DB.
	* @param bindings all bindings needed to access the DB tables on CloudFlare.
	*/
	constructor(bindings: Context) {
		this.bindings = bindings;
	};


	/**
	* @method update user token pairs.
	* @param user information from the active user.
	*/
	async updateUserAuthorizationCommandDB( user: UserInfoEntityData, freshUser: UserActiveData): Promise<boolean> {
		const { active_session, id, auth_token, refresh_token  } = user;
		const { session, authToken, refToken } = freshUser;
		const data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");


		try {
			await this.bindings.env.DB1.prepare(`
				INSERT INTO expired_tokens(
					user_id,
					session,
					auth_token,
					refresh_token,
					expired_tokens
				) Values (?1, ?2, ?3, ?4, ?5)
			`).bind(
				id,
				active_session,
				auth_token,
				refresh_token,
				data,
			).run();
			await this.bindings.env.DB1.prepare(`
				UPDATE users SET auth_token = ?, refresh_token = ?, active_session = ?
				WHERE id = ?
			`).bind(authToken, refToken, session, user.id).run();
			return(true);
		}
		catch(e) {
			console.error(e);
			return(false);
		}
	};

	/**
	* @method executes the switch tokens to the DB.
	* @param user the object has the new tokens to add into DB.
	*/
	async updateUserTokensCommandDB(user: UserInfoEntityData): Promise<UserInfoEntityData | boolean> {
		const secureProc =			new SecurityProceduresServices(user, this.bindings);
		const token: string = 		await secureProc.authTokenGen();
		const refToken: string =	await secureProc.refTokenGen();

		try {
			await this.bindings.env.DB1.prepare(`
				UPDATE users SET auth_token = ?, refresh_token = ?
				WHERE id = ?
			`).bind(token, refToken, user.id).run();
			user.auth_token =		token;
			user.refresh_token =	refToken;

			return(user);
		}
		catch(e) {
			//console.error(e);
			return(false);
		};
	};
};


/**
* @class execute all the procedures needed to add a new user on DB.
*/
export class CommandDBNewUser {
	private user: NewUserSecurityProceduresServices;
	private readonly bindings: Context;
	private newUser: NewUser;

	/**
	* @param userNew the basic user information to add to DB.
	* @param bindings the CloudFlare/Hono bindings to communicate to DB.
	*/
	constructor(userNew: NewUser, bindings: Context) {
		this.newUser = 	userNew;
		this.user =		new NewUserSecurityProceduresServices(bindings, userNew);
		this.bindings = bindings;

		this.checkIfTheUeserIsInDB();
	};


	/**
	* @method returns a user if it exists on DB.
	*/
	private async checkIfTheUeserIsInDB(): Promise<boolean> {
		const { userName, passFrase } = this.newUser;
		const user =	UserLogin.safeParse({ userName, passFrase });
		const DB =		user.success ?
			new QueryDBService(user.data, this.bindings): false;
		const foundUser = DB ? await DB.retrieveUserQueryDB : false;

		return (foundUser !== undefined);
	};

	/**
	* @method starts all procedures to add and save a new user data on DB.
	*/
	private async addNewUser(): Promise<boolean> {
		const id =			randomBytes(9).toString('hex');
		const token =		await this.user.authTokenGen();
		const refToken =	await this.user.refTokenGen();
		const encryptedPass: string | boolean = await this.user.encryptPass;
		const data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");
		const findUser =	await this.checkIfTheUeserIsInDB();

		if (!encryptedPass && findUser)
			return(false);
		try {
			await this.bindings.env.DB1.prepare(
				`INSERT INTO users (
				id,
				name,
				last_name,
				company_name,
				birth_date,
				email,
				pass_frase,
				auth_token,
				refresh_token,
				created,
				active_session,
				grant_access
			) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12);`)
			.bind(
				id,
				this.newUser.userName,
				this.newUser.userLastName,
				this.newUser.companyName,
				this.newUser.birthday,
				this.newUser.email,
				encryptedPass,
				token,
				refToken,
				data,
				"",
				this.newUser.access,
			).run();
			return(true);
		}
		catch(e) {
			console.error (`DB error: ${e}`);
			return(false);
		};
	};

	/**
	* @field starts the process to save a new user to DB
	*/
	get saveNewUser() {
		return(this.addNewUser());
	};
};


/**
* @class executes all input commands to the DB.
*/
export class CommandDBEstimates implements iCommandDBServiceEstimates {
	private user: UserActiveData;
	private bindings: Context;

	constructor(user: UserActiveData, bindings: Context) {
		this.user =		user;
		this.bindings = bindings;
	};

	/**
	* @method executes the procedures to save the solved results on DB.
	* @param estimate the solved list data to be saved.
	*/
	async saveEstimateCommandDB(estimate: SolvedList): Promise<boolean> {
		const data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");

		try {
			await this.bindings.env.DB1.prepare(
				`INSERT INTO ?1 (
					reference
				) VALUES (?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10);`)
				.bind(
				this.user.companyName,
				estimate.reference,
				estimate.list,
				estimate.reference,
				this.user.userName,
				this.user.ID,
				this.user.session,
				data,
				this.user.userName,
			).run();
			return(true);
		}
		catch(e) {
			//console.error (`DB error: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the procedures to update the existent solved list.
	* @param estimate the solved data to be updated.
	*/
	async updateEstimateCommandDB(estimate: SolvedList): Promise<boolean> {
		const data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");

		try {
			await this.bindings.env.DB1.prepare(
				`INSERT INTO ?1 (
					reference
				) VALUES (?2, ?3, ?4, ?5, ?6, ?7, ?8);`)
				.bind(
				this.user.companyName,
				estimate.reference,
				estimate.list,
				estimate.reference,
				this.user.session,
				data,
				this.user.userName,
			).run();
			return(true);
		}
		catch(e) {
			//console.error (`DB error: ${e}`);
			return(false);
		};
	};
};
