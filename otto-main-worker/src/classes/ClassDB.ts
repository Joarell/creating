import { User, UserDB } from '../types/type.schemas';
import { randomBytes } from "crypto";
import { Context } from 'hono';
import { UserOttoApp } from './ClassUser';
import { randomBytes } from "crypto";


/**
* @class This class represents the bridge and all operations handler to the data base.
*/
export class OttoDB {
	protected bindings: Context;

	/**
	* @param bindings The worker methods and fields to execute worker procedures.
	*/
	constructor(bindings: Context) {
		this.bindings =	bindings;
	};

	/**
	* @param user - all user data for storing in data base.
	*/
	protected async addUser(user: UserOttoApp): Promise<Response> {
		const id = randomBytes(5).toString('hex');
		const token = user.authToken;
		const refToken = user.refToken;
		const encryptedPass: string | number = user.passEncrypted;
		const data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString("pt-BR") ;

		if (Number.isInteger(encryptedPass) && encryptedPass === 500)
			return(
				new Response(
					`Server error to add new user: ${encryptedPass}`,
					{ status: 201 },
				)
			);
		try {
			await this.bindings.env.DB.prepare(
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
				user.userName,
				user.lastName,
				user.companyName,
				user.birthDay,
				user.email,
				encryptedPass,
				token,
				refToken,
				data,
				"0",
				user.access,
			).run();
			return(new Response('User added!', { status: 201 }));
		}
		catch(e) {
			console.error (`DB error: ${e}`);
			return(new Response(`Server error to add new user: ${e}`, { status: 201 }));
		};
	};

	/**
	* @param user User data from data base in order to switch tokens.
	*/
	protected async switchTokens(user: UserDB): Promise<boolean> {
		const { active_session, id, auth_token, refresh_token  } = user[0];

		try {
			await this.bindings.env.DB.prepare(`
				INSERT INTO expired_tokens(
					session,
					user_id,
					auth_token,
					refresh_token
				) Values (?1, ?2, ?3, ?4)
			`).bind(
				active_session,
				id,
				auth_token,
				refresh_token,
			).run();
			return(true);
		}
		catch(e) {
			console.error(e);
			return(false);
		}
	};

	/**
	* @param user User data from data base.
	*/
	protected async loginUpdateTokens(user: UserDB, userAct: UserOttoApp ): Promise<string | boolean> {
		await this.switchTokens(user);
		const token: string = await userAct.authToken;
		const refToken: string = await userAct.refToken;
		const session: string = randomBytes(20).toString('hex');

		try {
			await this.bindings.env.DB.prepare(`
				UPDATE users SET active_session = ?, auth_token = ?, refresh_token = ?
				WHERE id = ?
			`).bind(session, token, refToken, user[0].id).run();
			return(session);
		}
		catch(e) {
			console.error(e);
			return(false);
		};
	};

	/**
	* @param user The user information to get if from data base data.
	*/
	async grabUsers(user: User | UserOttoApp): Promise<UserDB> {
		const { results } = await this.bindings.env.DB.prepare(`
			SELECT * FROM users WHERE name = ?;
		`).bind(user.userName).all();
		return(results);
	};
};
