import { QueryDBService, QueryDBUserActions } from "../repository/ClassQueryDB";
import { CommandDB, CommandDBEstimates, CommandDBNewUser } from "../repository/ClassCommandDB";
import { Reference, SolvedList } from "../repository/models/EstimateType";
import { NewUser, UserActiveData, UserInfoEntityData, UserLogin } from "../repository/models/userData";
import SecurityProceduresServices from "../repository/SecureProceduresServices";
import { iServiceDB } from "../repository/models/ServiceDB";
import { Context } from "hono";
import { KVCommand } from "../repository/ClassKVCommand";
import { Session } from "../repository/models/LoginState";
import { KVQuery } from "../repository/ClassKVQuery";
import { randomBytes } from "crypto"

/**
 * @class ServiceDB responsible for execute all DB actions from the client.
*/
export class ServiceDB implements iServiceDB {
	private bindings: Context;

	constructor(bindings: Context) {
		this.bindings =	bindings;
	};

	/**
	 * @method grabs the DB user data to convert to UserActiveData after login verification.
	 * @param data the DB user data to extract.
	*/
	private userActivationParser(data: UserInfoEntityData): UserActiveData {
		const session = randomBytes(13).toString('hex');
		const userActivated: UserActiveData = {
			userName: data.name,
			userLastName: data.last_name,
			passFrase: data.pass_frase,
			birthday: data.birth_date,
			email: data.email,
			companyName: data.company_name,
			access: data.grant_access,
			authToken: data.auth_token,
			refToken: data.refresh_token,
			session,
			state: true
		};

		return (userActivated);
	};

	/**
	* @method executes the login procedures to available user.
	* @param user the name and passFrase from a user to be checked and start a login procedures.
	*/
	async loginCommandDB(newLogin: UserLogin): Promise<UserActiveData | undefined> {
		const ottoUser: UserInfoEntityData | undefined = await this.retrieveUserDB(newLogin);
		const secureChecker = ottoUser ?
			new SecurityProceduresServices(ottoUser, this.bindings) : ottoUser;
		let userActivated: UserActiveData | undefined;
	 	let refreshedUserDB: boolean = false;

		secureChecker !== undefined ? secureChecker.userLoginData = newLogin : false;
		if (secureChecker?.loginChecker && ottoUser) {
			userActivated = this.userActivationParser(ottoUser);
			const DB = new CommandDB(this.bindings);
			refreshedUserDB = await DB.updateUserAuthorizationCommandDB(ottoUser, userActivated);
		};

		return (refreshedUserDB ? userActivated: undefined);
	};

	/**
	* @method called to save the solved estimate in to DB entity.
	* @param estimate The solved list Object to be saved.
	*/
	async saveEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<boolean> {
		const dbEstimate = new CommandDBEstimates(user, this.bindings);
		return(await dbEstimate.saveEstimateCommandDB(estimate));
	};

	/**
	* @method executes the login command to the DB entity.
	* @param estimate The solved list Object to be saved.
	*/
	async updateEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<boolean> {
		const updateResult = new CommandDBEstimates(user, this.bindings);
		return (await updateResult.updateEstimateCommandDB(estimate));
	};

	/**
	* @method called to get a defined estimate entity saved in DB.
	* @param reference returns the solved list Object to be saved.
	*/
	async retrieveEstimateDB(reference: Reference): Promise<SolvedList | undefined> {
		const estimate = new QueryDBUserActions(this.bindings);
		return (await estimate.retrieveEstimateQueryDB(reference));
	};

	/**
	*  @method called to get a  defined user entity saved on DB.
	*  @param user returns the user entity saved on DB.
	*/
	async retrieveUserDB(user: UserLogin): Promise<UserInfoEntityData | undefined> {
		const OttoUser = new QueryDBService(user, this.bindings);
		return(await OttoUser.retrieveUserQueryDB);
	};

	/**
	 * @method return the user data if it is logged in.
	 * @param session the unique user session ID.
	*/
	async retrieveUserSession(session: Session): Promise<UserActiveData | undefined> {
		const KV =			new KVQuery(session, this.bindings);
		const userState =	await KV.restoreUser;
		return(userState);
	};

	/**
	* @method check if the current user is already logged in.
	* @param user the use authorization object.
	*/
	async checkUserActive(user: UserLogin): Promise<boolean> {
		const activeChecker =	new KVQuery("", this.bindings);
		return(await activeChecker.userAlreadyActiveChecker(user));
	};

	/**
	* @method called to exchange and update the token pairs.
	* @param activeUser basic information to extract the current token pairs.
	*/
	async updateUserTokenDB(user: UserLogin): Promise<UserActiveData | boolean> {
		const userShiftTokens =	new CommandDB(this.bindings);
		const userDB =			await this.retrieveUserDB(user);
		const refreshedUser = 	userDB !== undefined ?
			await userShiftTokens.updateUserTokensCommandDB(userDB):
			false;
		const newActiveuser = 	refreshedUser ?
			UserInfoEntityData.safeParse(refreshedUser)?.data : undefined;

		return (newActiveuser ? this.userActivationParser(newActiveuser): false);
	};

	/**
	* @method adds the new active session the CloudFlare KV memory cache.
	* @param session the user info to extract the active session value.
	*/
	async addUserSession(activeUser: UserActiveData): Promise<boolean> {
		const session = new KVCommand(activeUser, this.bindings);
		return (await session.userSaveData);
	};

	/**
	* @method execute the procedures to add a new Otto user.
	* @param newUser basic user information to add to DB.
	*/
	async addingNewUser(newUser: NewUser): Promise<boolean> {
		const DB = new CommandDBNewUser(newUser, this.bindings);
		return(DB.saveNewUser);
	};

	/**
	* @method removes the user from the KV db cache on CloudFlare.
	* @param activeUser the basic user info to seek and destroy.
	*/
	async logOutCommand(activeUser: UserActiveData): Promise<boolean> {
		const userLogOut = new KVCommand(activeUser, this.bindings);
		return(await userLogOut.userLoggingOut);
	};
};
