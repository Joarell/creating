import { UserActiveData, UserLogin } from "../repository/models/userData";
import { iLoginState } from "../repository/models/LoginState";
import { Context } from "hono";
import { ServiceDB } from "./ServiceDB";
import { UserActive } from "../ClassActiveUser";


/**
* @class responsible to reconstruct the user enttity
*/
export class LoginState implements iLoginState {
	private bindings: Context;

	constructor(bindings: Context) {
		this.bindings = bindings;
	};

	/**
	* @method executes the login call to the ServiceDB.
	* @param user the basic user authentication info.
	*/
	async logIn(user: UserLogin): Promise<UserActive | undefined> {
		const userLogging = new ServiceDB(this.bindings);
		const logged =		await userLogging.loginCommandDB(user);

		//console.log(logged)
		return (logged ? new UserActive(logged, this.bindings) : undefined);
	};

	/**
	* @method executes the logOut call to the ServiceDB.
	* @param user the basic user authentication info.
	*/
	async logOut(user: UserActiveData): Promise<boolean> {
		const userLoggingOut = new ServiceDB(this.bindings);
		return (await userLoggingOut.logOutCommand(user));
	};

	/**
	* @method reconstruct the user object.
	* @param session the unique session ID after user logged in.
	*/
	private async restoreUserState(): Promise<UserActive | undefined> {
		// BUG: may be the desctructuring is not in the correct way.
		const { session } =		await this.bindings.req.json()
		const checker =			new ServiceDB(this.bindings);
		const grabUser =		await  checker.retrieveUserSession(session);
		const userRestored =	grabUser ?
			new UserActive(grabUser, this.bindings) : undefined;

		return (userRestored);
	};

	/**
	* @method starts the user check in app
	* @param user the basic user authentication.
	*/
	async checkUserLoggedIn(user: UserLogin): Promise<boolean> {
		const checker = new ServiceDB(this.bindings);
		return(await checker.checkUserActive(user));
	};

	get restoringUser() {
		return(this.restoreUserState());
	}
};
