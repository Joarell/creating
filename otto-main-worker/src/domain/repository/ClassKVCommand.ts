import { UserActiveData } from "./models/userData";
import { iKVCommand } from "./models/KVCommand";
import { Context } from "hono";


/**
* @class executes all commands to the CloudFlare KV memory cache.
*/
export class KVCommand implements iKVCommand {
	private bindings: Context;
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
	* @method responsible to add the user data to the CloudFlare memory cache KV
	*/
	private async putUserData(): Promise<boolean> {
		const eightHoursInSeconds: number = 28800;
		try {
			await this.bindings.env.OTTO_USER.put(
				this.user.userName, this.user.session,
				{
					expirationTtl: eightHoursInSeconds
				}
			);
			await this.bindings.env.OTTO_USER.put(
				this.user.session, this.user,
				{
					expirationTtl: eightHoursInSeconds
				}
			);
			return(true);
		}
		catch(e) {
			console.error(e);
			return(false)
		};
	};

	/**
	* @method responsible to add the user data to the CloudFlare memory cache KV
	*/
	private async userLogOut(): Promise<boolean> {
		try {
			await this.bindings.env.OTTO_USER.delete(this.user.userName);
			await this.bindings.env.OTTO_USER.delete(this.user.session);
			return(true);
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
		return(this.putUserData());
	};
};
