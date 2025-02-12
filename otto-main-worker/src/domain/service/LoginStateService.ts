import { UserActiveData, UserDataRequest, UserLogin } from "../repository/models/userData";
import { iLoginState } from "../repository/models/LoginState";
import { Context } from "hono";
import { ServiceDB } from "./ServiceDB";
import { UserActive } from "../ClassActiveUser";
import { KVCommand } from "../repository/ClassKVCommand";
import { KVQuery } from "../repository/ClassKVQuery";


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
		const { user } = await this.bindings.req.json()
		const dataUser = UserDataRequest.safeParse(user);
		let userRestored;

		if (dataUser.success) {
			const KV =				new KVQuery(this.bindings);
			KV.definesSession =		dataUser.data.session;
			const restored =		await KV.restoreUser;

			if (restored) {
				const checker =		new ServiceDB(this.bindings);
				const grabUser =	await checker.retrieveUserSession(dataUser.data);
				const validTKS =	grabUser ?
					await checker.tokenCheckerValidation(grabUser): false

				userRestored =	validTKS && grabUser ?
					new UserActive(grabUser, this.bindings) : undefined;
			};
		};
		return (userRestored);
	};

	/**
	* @method sotores on CloudFlare KV the previous user session.
	* @param user object with the user name.
	*/
	private async setLastUserAction(user: UserLogin): Promise<void> {
		const queryKV =	new KVQuery(this.bindings);
		const session =	await queryKV.userAlreadyActiveSession(user.userName);
		const userParsed = typeof session === 'string' ?
			UserActiveData.safeParse(session): false;

		if(userParsed && userParsed.success) {
			const commandKV = new KVCommand(userParsed.data, this.bindings);
			await commandKV.userLogiHasRequired;
		};
	};

	/**
	* @method starts the user check in app
	* @param user the basic user authentication.
	*/
	async checkUserLoggedIn(user: UserLogin): Promise<boolean | undefined> {
		const took =	this.bindings.req.path.split('/')[3] === 'boot'
		const checker =	new ServiceDB(this.bindings);

		if (took)
			await this.setLastUserAction(user);

		return(took ? await checker.checkUserActive(user): false);
	};

	get restoringUser() {
		return(this.restoreUserState());
	}
};
