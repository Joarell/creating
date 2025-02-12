import { iCommandDBServiceEstimates, iCommandDBService } from "./models/CommandRepository";
import { UserInfoEntityData, UserActiveData, NewUser, UserLogin, UserDataRequest } from "./models/userData";
import { SolvedList } from "./models/EstimateType";
import { Context } from "hono";
import { randomBytes } from "crypto";
import SecurityProceduresServices, { NewUserSecurityProceduresServices } from "./SecureProceduresServices";
import { QueryDBService, QueryDBUserActions } from "./ClassQueryDB";


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
	* @method saves the new pass phrase on DB.
	* @param user object with the proper user name to be updated.
	* @param newPass the new encrypted pass phrase.
	*/
	async updateUserPassPhraseDB(user: UserDataRequest, newPass: string): Promise<boolean> {
		try {
			await this.bindings.env.DB1.prepare(`
				UPDATE users SET pass_phrase = ? WHERE name = ?;
			`).bind(newPass, user.userName).run();

			return(true);
		}
		catch(e) {
			console.error(e);
			return(false);
		};
	};

	/**
	* @method store the old tokens on DB.
	* @param user object with all data needed.
	*/
	async saveExpiredAndShiftedTokens(user: UserInfoEntityData): Promise<boolean> {
		try {
			const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");
			await this.bindings.env.DB1.prepare(`
				INSERT INTO '${user.company_name}_expired_tokens' (
					user_id,
					session,
					auth_token,
					refresh_token,
					expired_date
				) VALUES (?1, ?2, ?3, ?4, ?5);
			`).bind(user.id, user.active_session, user.auth_token, user.refresh_token, date).run();
			await this.bindings.env.DB1.prepare(`
				SELECT * FROM '${user.company_name}_expired_tokens' WHERE session = '${user.active_session}'
			`).all()
			return(true)
		}
		catch(e) {
			console.error(`Expired tokens error: ${e}`)
			return(false)
		}
	};

	/**
	* @method executes the switch tokens to the DB.
	* @param user the object has the new tokens to add into DB.
	*/
	async updateUserTokensCommandDB(user: UserInfoEntityData, login: boolean = false): Promise<UserInfoEntityData | boolean> {
		const secureProc =	new SecurityProceduresServices(user, this.bindings);
		const token = 		await secureProc.authTokenGen();
		const refToken =	await secureProc.refTokenGen();
		const session =		randomBytes(13).toString('hex');

		try {
			if (login) {
				await this.bindings.env.DB1.prepare(`
					UPDATE users SET auth_token = ?, refresh_token = ?
					WHERE id = ?
				`).bind(token, refToken, user.id).run();

				const storeTokens = await this.saveExpiredAndShiftedTokens(user);

				user.auth_token =		structuredClone(token);
				user.refresh_token =	structuredClone(refToken);
				user.active_session =	session;
				await this.userSessionUpdate(user);
				return(storeTokens ? user : false);
			};
			await this.bindings.env.DB1.prepare(`
				UPDATE users SET refresh_token = ?
				WHERE id = ?
			`).bind(refToken, user.id).run();

			const storeTokens = await this.saveExpiredAndShiftedTokens(user);

			user.refresh_token =	structuredClone(refToken);
			return(storeTokens ? user : false);
		}
		catch(e) {
			console.error(e);
			return(false);
		};
	};

	/**
	* @method update the session id when user is logged in.
	* @param user the object with all data needed.
	*/
	private async userSessionUpdate(user: UserInfoEntityData): Promise<void> {
		try {
			await this.bindings.env.DB1.prepare(`
				UPDATE users SET active_session = ? WHERE name = ?;
			`).bind(user.active_session, user.name).run()
		}
		catch(e) {
			console.error(`Session save error: ${e}`)
		}
	};

	/**
	* @method store the user token pairs after a retry using the same token expired.
	* @param user the object with all data needed to save a report.
	*/
	async storeSuspiciousTokens(user: UserActiveData): Promise<boolean> {
		const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");
		try {
			await this.bindings.env.DB1.prepare(`
				INSERT INTO '${user.companyName}_suspicious_tokens' (
					session,
					user_id,
					auth_token,
					refresh_token,
					event_date
				) VALUES (?1, ?2, ?3, ?4, ?5);
			`).bind(
				user.session,
				user.ID,
				user.authToken,
				user.refToken,
				date,
			).run();
			return(true)
		}
		catch(e) {
			console.error(`Suspicious table ERROR: ${e}`)
			return(false)
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
		const { userName, passPhrase } = this.newUser;
		const user =	UserLogin.safeParse({ userName, passPhrase });
		const DB =		user.success ?
			new QueryDBService(user.data, this.bindings): false;
		const foundUser = DB ? await DB.retrieveUserQueryDB : false;

		return (foundUser !== undefined);
	};


	/**
	* @method creates the new data base for the first company user.
	*/
	private async setNewDataBase(): Promise<void> {
		await Promise.resolve(
			await this.bindings.env.DB1.prepare(`
				CREATE TABLE IF NOT EXISTS '${ this.newUser.companyName }'(
					reference_id TEXT PRIMARY KEY NOT NULL,
					solved_list TEXT NOT NULL,
					user_name TEXT NOT NULL,
					user_id TEXT NOT NULL,
					session TEXT NOT NULL,
					last_update TEXT,
					update_by TEXT,
					FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION
				);
			`).run()
		).then(async () => {
			await this.bindings.env.DB1.prepare(`
				CREATE TABLE IF NOT EXISTS '${ this.newUser.companyName }_expired_tokens'(
					user_id TEXT NOT NULL,
					session TEXT NOT NULL,
					auth_token TEXT NOT NULL,
					refresh_token TEXT NOT NULL,
					expired_date TEXT NOT NULL,
					FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION
				);
			`).run();
		}).then(async () => {
			await this.bindings.env.DB1.prepare(`
				CREATE TABLE IF NOT EXISTS '${this.newUser.companyName}_suspicious_tokens'(
					session TEXT NOT NULL,
					user_id TEXT NOT NULL,
					auth_token TEXT NOT NULL,
					refresh_token TEXT NOT NULL,
					event_date TEXT NOT NULL,
					FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE NO ACTION
				)
			`).run();
		}).catch(error => console.error(`Table creation ERROR: ${error}`));
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
				pass_phrase,
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
			await this.setNewDataBase();
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
	private Message = {
		dubplicate: "Estimate already exists!",
		empty:		"Value not found!",
		DBError:	"Incorrect data!",
	}

	constructor(user: UserActiveData, bindings: Context) {
		this.user =		user;
		this.bindings = bindings;
	};

	/**
	* @method executes the procedures to save the solved results on DB.
	* @param estimate the solved list data to be saved.
	*/
	async saveEstimateCommandDB(estimate: SolvedList): Promise<boolean | string> {
		const data =			new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");
		const check =			new QueryDBUserActions(this.bindings);
		const findEstimate =	await check.retrieveEstimateQueryDB(this.user, estimate.reference);
		const solved =			JSON.stringify(estimate);

		if (findEstimate !== undefined)
			return(this.Message.dubplicate);
		try {
			await this.bindings.env.DB1.prepare(
				`INSERT INTO ${ this.user.companyName } (
					reference_id,
					solved_list,
					user_name,
					user_id,
					session,
					last_update,
					update_by
				) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`).bind(
					""+estimate.reference,
					solved,
					""+this.user.userName,
					""+this.user.ID,
					""+this.user.session,
					data,
					""+this.user.userName,
			).run();
			return(true);
		}
		catch(e) {
			console.error (`DB error: ${e}`);
			return(false);
		};
	};

	/**
	* @method executes the procedures to update the existent solved list.
	* @param estimate the solved data to be updated.
	*/
	async updateEstimateCommandDB(estimate: SolvedList): Promise<boolean | string> {
		const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR");
		const updatedSolution = JSON.stringify(estimate);

		try {
			await this.bindings.env.DB1.prepare(
				`UPDATE '${ this.user.companyName }'
				SET solved_list =		'${ updatedSolution }',
					session =			'${ ""+this.user.session }',
					last_update =		'${ date }',
					update_by =			'${ ""+this.user.userName }'
				WHERE reference_id =	'${estimate.reference}';`)
			.run();
			return(true);
		}
		catch(e) {
			console.error (`DB updated error: ${e}`);
			return(false);
		};
	};
};
