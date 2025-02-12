import { iKVQuery, UserName } from "./models/KVQuery";
import { Context } from "hono";
import { Session } from "./models/LoginState";


export class KVQuery implements iKVQuery {
	private readonly bindings: Context;
	private session: Session;

	constructor(bindings: Context) {
		this.bindings =	bindings;
	};

	/**
	* @method returns the user stored on CloudFlare KV.
	*/
	private async grabUserData(): Promise<string | undefined> {
		try {
			const user = await this.bindings.env.OTTO_USERS.get(this.session);
			return(JSON.parse(user));
		}
		catch(e) {
			console.error(e);
			return (undefined);
		};
	};

	/**
	* @method recover the user last session.
	* @param userName the key value for finding the session.
	*/
	async userAlreadyActiveSession(userName: UserName): Promise<string | boolean> {
		try {
			const KVSESSION = await this.bindings.env.OTTO_USERS.get(userName);
			return(KVSESSION !== null ? KVSESSION: false);
		}
		catch(e) {
			console.error(e);
			return(false);
		};
	};

	/**
	* @method returns the array with all user session revogated.
	*/
	private async lastSessionArraySession(): Promise<[ string ] | undefined> {
		const list = await this.bindings.env.OTTO_USERS.get("ultimateSession");
		return(list !== null ? JSON.parse(list): undefined);
	};

	private async lastUserActionSession(): Promise<boolean> {
		const list =		await this.bindings.env.OTTO_USERS.get("ultimateSession");
		const sessions =	list !== null ? JSON.parse(list): false;

		return(Array.isArray(sessions) ? sessions.includes(this.session): false);
	};

	/**
	* @method consults if the user is already active.
	*/
	async userAlreadyActiveChecker(userName: UserName): Promise<boolean> {
		try {
			const KVUSER = await this.bindings.env.OTTO_USERS.get(userName);
			return(KVUSER !== null);
		}
		catch(e) {
			console.error(e);
			return(false);
		};
	};

	/**
	* @field starts the user restoration process.
	*/
	get restoreUser() {
		return(this.grabUserData());
	}

	/**
	* @field returns the array with all sessions revogated.
	*/
	get lastSessionArray() {
		return(this.lastSessionArraySession());
	}

	get checkLastAction() {
		return(this.lastUserActionSession());
	};

	/**
	* @field provides the user session to be find.
	*/
	set definesSession(session: Session) {
		this.session = session;
	};
};
