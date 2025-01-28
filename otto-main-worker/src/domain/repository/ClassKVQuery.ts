import { iKVQuery } from "./models/KVQuery";
import { Context } from "hono";
import { Session } from "./models/LoginState";
import { UserActiveData, UserLogin } from "./models/userData";


export class KVQuery implements iKVQuery {
	private bindings: Context;
	private session: Session;

	constructor(user: Session, bindings: Context) {
		this.session = 	user;
		this.bindings =	bindings;

	};

	private async grabUserData(): Promise<UserActiveData | undefined> {
		try {
			const user = await this.bindings.env.OTTO_USER.get(this.session);
			return(user);
		}
		catch(e) {
			//console.error(e);
			return (undefined);
		};
	};

	/**
	* @method consults if the user is already active.
	*/
	async userAlreadyActiveChecker(user: UserLogin): Promise<boolean> {
		try {
			const KVUSER = await this.bindings.env.OTTO_USER.get(user.userName);
			return(!(KVUSER === undefined));
		}
		catch(e) {
			//console.error(e);
			return(false);
		};
	};

	/**
	* @field starts the user restoration process.
	*/
	get restoreUser() {
		return(this.grabUserData());
	}
};
