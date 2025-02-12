import { UserActiveData } from "./models/userData";
import { iKVCommand } from "./models/KVCommand";
import { Context } from "hono";
import { KVQuery } from "./ClassKVQuery";


/**
* @class executes all commands to the CloudFlare KV memory cache.
*/
export class KVCommand implements iKVCommand {
	private readonly bindings: Context;
	private user: UserActiveData;

	/**
	* @constructor receives dependencies to execute methods.
	* @param user has the basic user info.
	* @param bindings the object to communicate to the CloudFlare KV memory cache.
	*/
	constructor(user: UserActiveData, bindings: Context) {
		this.user = 	user;
		this.bindings =	bindings;
	};

	/**
	* @method save the user session when it take from another one.
	*/
	private async addUserLastSessionBeforeLoginOut(): Promise<void> {
		const activeSession =		new KVQuery(this.bindings);
		const session =				await activeSession.userAlreadyActiveSession(this.user.userName);
		const lastUserSessions =	await activeSession.lastSessionArray;

		try {
			const checking = Array.isArray(lastUserSessions) && typeof session === 'string';

			if(checking && !lastUserSessions.includes(session)) {
				lastUserSessions.push(session)
				await this.bindings.env.OTTO_USERS.delete("ultimateSession");
				await this.bindings.env.OTTO_USERS.put("ultimateSession", lastUserSessions);
			}
			else {
				await this.bindings.env.OTTO_USERS.put(
					"ultimateSession", JSON.stringify([session])
				);
			};
		}
		catch(e){
			console.error(`Last Action procedure ERROR: ${e}`);
		};
	};

	/**
	* @method responsible to add the user data to the CloudFlare memory cache KV
	*/
	private async saveUserSessionData(): Promise<boolean> {
		const eightHoursInSeconds: number = 28800;
		this.bindings.req.path.split('/')[3] === 'boot' ?
			await this.addUserLastSessionBeforeLoginOut(): false;

		try {
			await this.bindings.env.OTTO_USERS.put(
				this.user.userName, this.user.session,
				{ expirationTtl: eightHoursInSeconds }
			);
			await this.bindings.env.OTTO_USERS.put(
				this.user.session, JSON.stringify(this.user),
				{ expirationTtl: eightHoursInSeconds }
			);
			return(true);
		}
		catch(e) {
			console.error(e);
			return(false)
		};
	};

	/**
	* @method removes the user session from the lastSessionArray on CloudFlare kV.
	*/
	private async removeUserLastSession(): Promise<void> {
		const queryKV =			new KVQuery(this.bindings);
		const session =			await queryKV.userAlreadyActiveSession(this.user.userName);
		const arraySessions =	await queryKV.lastSessionArray;

		try {
			const index = typeof session === 'string' ?
				arraySessions?.indexOf(session): false;

			index ? arraySessions?.splice(0, index): 0;
			await this.bindings.env.OTTO_USERS.delete("ultimateSession");
			await this.bindings.env.OTTO_USERS.put("ultimateSession", arraySessions);
		}
		catch(e) {
			console.error(`Cleaning last session ERROR: ${e}`);
		};
	};

	/**
	* @method responsible to add the user data to the CloudFlare memory cache KV
	*/
	private async userLogOut(): Promise<boolean> {
		try {
			await this.removeUserLastSession();
			await this.bindings.env.OTTO_USERS.delete(this.user.userName);
			await this.bindings.env.OTTO_USERS.delete(this.user.session);
			const clean1 = await this.bindings.env.OTTO_USERS.get(this.user.userName);
			const clean2 = await this.bindings.env.OTTO_USERS.get(this.user.session);

			return(clean1 === null && clean2 === null);
		}
		catch(e) {
			console.error(e);
			return(false)
		};
	};

	/**
	* @field execute the user logout removing it from the KV cache.
	*/
	get userLoggingOut() {
		return(this.userLogOut());
	};

	/**
	* @field add the user information after login.
	*/
	get userSaveData() {
		return(this.saveUserSessionData());
	};

	/**
	* @field removes the user session from the active list.
	*/
	get cleanSession() {
		return(this.removeUserLastSession());
	}

	/**
	* @field adds the previous session to the logout on next actin list.
	*/
	get userLogiHasRequired() {
		return(this.addUserLastSessionBeforeLoginOut());
	};
};
