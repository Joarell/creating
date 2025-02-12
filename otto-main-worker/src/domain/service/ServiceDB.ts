import { QueryDBService, QueryDBUserActions } from "../repository/ClassQueryDB";
import { CommandDB, CommandDBEstimates, CommandDBNewUser } from "../repository/ClassCommandDB";
import { Reference, SolvedList } from "../repository/models/EstimateType";
import { NewUser, UserActiveData, UserDataRequest, UserInfoEntityData, UserLogin } from "../repository/models/userData";
import SecurityProceduresServices, { TokenPairsValidator } from "../repository/SecureProceduresServices";
import { iServiceDB, Result } from "../repository/models/ServiceDB";
import { Context } from "hono";
import { KVCommand } from "../repository/ClassKVCommand";
import { KVQuery } from "../repository/ClassKVQuery";


/**
 * @class ServiceDB responsible for execute all DB actions from the client.
*/
export class ServiceDB implements iServiceDB {
	private readonly bindings: Context;

	constructor(bindings: Context) {
		this.bindings =	bindings;
	};

	/**
	* @method grabs the DB user data to convert to UserActiveData after login verification.
	* @param data the DB user data to extract.
	*/
	private userActivationParser(data: UserInfoEntityData): UserActiveData {
		const userActivated: UserActiveData = {
			userName:		data.name,
			userLastName:	data.last_name,
			passPhrase:		data.pass_phrase,
			birthday:		data.birth_date,
			email:			data.email,
			companyName:	data.company_name,
			access:			data.grant_access,
			authToken:		data.auth_token,
			refToken:		data.refresh_token,
			session:		data.active_session,
			ID:				data.id,
		};
		return (userActivated);
	};

	/**
	* @method defines how would be the login option based on route path.
	* @param userLogin basic user authentication object.
	*/
	private async newLoginOptionProcedure(userLogin: UserLogin, kickOut: boolean = false):
	Promise<UserInfoEntityData | boolean> {
		const checkIn = await this.checkUserActive(userLogin);
		let refreshedUserDB: boolean | UserInfoEntityData = false;

		if (!checkIn || kickOut) {
			const ottoUser = await this.retrieveUserDB(userLogin);

			if (userLogin && ottoUser) {
				const DB = new CommandDB(this.bindings);
				refreshedUserDB = await DB.updateUserTokensCommandDB(ottoUser, true);
			};
		};
		return(refreshedUserDB);
	};

	/**
	* @method executes the login procedures to available user.
	* @param user the name and passPhrase from a user to be checked and start a login procedures.
	*/
	async loginCommandDB(newLogin: UserLogin): Promise<UserActiveData | undefined> {
		const took =	this.bindings.req.path.split('/')[3] === 'boot';
		const loginOption = await this.newLoginOptionProcedure(newLogin, took);
		let userActivated = typeof loginOption !== 'boolean' ?
			this.userActivationParser(loginOption): false;

		if (took && userActivated) {
			const commandKV = new KVCommand(userActivated, this.bindings);
			await commandKV.userLogiHasRequired;
		};
		typeof userActivated !== 'boolean' ? this.addUserSession(userActivated): false;
		return (
			userActivated && typeof userActivated !== 'boolean' ?
				userActivated : undefined
		);
	};

	/**
	* @method check if the current user is already logged in.
	* @param user the use authorization object.
	*/
	async checkUserActive(user: UserLogin): Promise<boolean | undefined> {
		const activeChecker =	new KVQuery(this.bindings);
		const DB =				new QueryDBService(user, this.bindings);
		const userState =		await activeChecker.userAlreadyActiveChecker(user.userName);
		const locateUser =		await DB.retrieveUserQueryDB;

		return(locateUser ? userState : undefined);
	};

	/**
	* @method checks if the token pairs is valid or not.
	* @param session the user id to restore the UserActiveData.
	*/
	async tokenCheckerValidation(user: UserActiveData): Promise<boolean | number> {
		const tokensCK =			new TokenPairsValidator(this.bindings);
		const checkAuthToken =		await tokensCK.authTokenChecker(user);
		const checkRefreshToken =	await tokensCK.refreshTokenChecker(user);
		const commandDB =			new CommandDB(this.bindings);
		let checked: boolean =		false;

		if(checkAuthToken === 403)
			return(403);
		else if(checkAuthToken && checkRefreshToken)
			checked = true;
		else if(!checkRefreshToken) {
			const { userName, passPhrase } = user;
			const queryDB =	await this.retrieveUserDB({userName, passPhrase});

			if (queryDB) {
				await commandDB.updateUserTokensCommandDB(queryDB);
				checked = true
			};
		};
		return(checked);
	};

	/**
	* @method executes the last action to user that has took from another log in.
	* @param user object with the session id.
	* @param result the current response case it`s not the last user action.
	*/
	private async theLastActionBeforeLoggingOut<Result>(user: UserActiveData, result: Result): Promise<Result | number> {
		const queryKV =				new KVQuery(this.bindings);
		queryKV.definesSession =	user.session;
		const commandKV =			new KVCommand(user, this.bindings);
		const lastAction =			await queryKV.checkLastAction;

		switch(lastAction) {
			case true:
				commandKV.cleanSession;
				return(301);
			default:
				return(result)
		};
	};

	/**
	* @method called to save the solved estimate in to DB entity.
	* @param estimate The solved list Object to be saved.
	*/
	async saveEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<Result> {
		const baseUser =	UserDataRequest.safeParse(user).data;
		const tokenCheck =	await this.tokenCheckerValidation(user);

		if (tokenCheck === 403)
			return(tokenCheck)

		const dbEstimate =	new CommandDBEstimates(user, this.bindings);
		const result = 		baseUser !== undefined && tokenCheck ?
			await dbEstimate.saveEstimateCommandDB(estimate): false

		return(await this.theLastActionBeforeLoggingOut(user, result));
	};

	/**
	* @method executes the login command to the DB entity.
	* @param estimate The solved list Object to be saved.
	* @param user has all the information needed to search the correct table in DB.
	*/
	async updateEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<Result> {
		const baseUser =		UserDataRequest.safeParse(user).data;
		const tokenCheck =		await this.tokenCheckerValidation(user);

		if (tokenCheck === 403)
			return(tokenCheck)

		const updateResult =	new CommandDBEstimates(user, this.bindings);
		const result = 			baseUser !== undefined && tokenCheck ?
			await updateResult.updateEstimateCommandDB(estimate): false;

		return(await this.theLastActionBeforeLoggingOut(user, result));
	};

	/**
	* @method called to get a defined estimate entity saved in DB.
	* @param reference returns the solved list Object to be saved.
	* @param user has all the information needed to search the correct table in DB.
	*/
	async retrieveEstimateDB(user: UserActiveData, reference: Reference): Promise<Result> {
		const baseUser =	UserDataRequest.safeParse(user).data;
		const tokenCheck =	await this.tokenCheckerValidation(user);

		if (tokenCheck === 403)
			return(tokenCheck)

		const estimate =	new QueryDBUserActions(this.bindings);
		const result =		baseUser !== undefined && tokenCheck ?
			await estimate.retrieveEstimateQueryDB(user, reference): undefined;

		return (await this.theLastActionBeforeLoggingOut(user, result));
	};

	/**
	* @method executes the new pass phrase procedures call.
	* @param user object with all data needed to update the pass phrase.
	*/
	async updateUserPassPhrase(user: UserDataRequest, newPassPhrase: string): Promise<boolean> {
		const userDB = await this.retrieveUserDB(user);
		let result;

		if(userDB !== undefined) {
			const secureProc = new SecurityProceduresServices(userDB, this.bindings);
			secureProc.userLoginData = { userName: user.userName, passPhrase: newPassPhrase };
			const encryptedPass =	await secureProc.encryptPass;
			const DB =		 		new CommandDB(this.bindings);
			result =				typeof encryptedPass === 'string' ?
				await DB.updateUserPassPhraseDB(user, encryptedPass): undefined;
		};
		return(result !== undefined && result);
	};

	/**
	* @method called to get a  defined user entity saved on DB.
	* @param user returns the user entity saved on DB.
	*/
	async retrieveUserDB(user: UserDataRequest | UserLogin): Promise<UserInfoEntityData | undefined> {
		const OttoUser = new QueryDBService(user, this.bindings);
		return(await OttoUser.retrieveUserQueryDB);
	};

	/**
	* @method return the user data if it is logged in.
	* @param session the unique user session ID.
	*/
	async retrieveUserSession(user: UserDataRequest): Promise<UserActiveData | undefined> {
		const KV =			new KVQuery(this.bindings);
		KV.definesSession = user.session;
		const restored =	UserActiveData.safeParse(await KV.restoreUser);
		const tokenCheck =	restored.success ?
			await this.tokenCheckerValidation(restored.data): false;

		return(tokenCheck && tokenCheck !== 403 ? restored?.data: undefined);
	};

	/**
	* @method called to exchange and update the token pairs.
	* @param user basic information to extract the current token pairs.
	*/
	async updateUserTokenDB(user: UserDataRequest): Promise<UserDataRequest | boolean> {
		const userShiftTokens =	new CommandDB(this.bindings);
		const userKV =			this.retrieveUserSession(user);

		if(userKV === null || !userKV)
			return(false);

		const userDB =			await this.retrieveUserDB(user);
		let newActiveUser;
		if (userDB && userKV !== null){
			const refreshedUser = await userShiftTokens.updateUserTokensCommandDB(userDB);

			newActiveUser = 	refreshedUser ?
				UserInfoEntityData.safeParse(refreshedUser)?.data : undefined;
		};

		return (newActiveUser ? this.userActivationParser(newActiveUser): false);
	};

	/**
	* @method adds the new active session the CloudFlare KV memory cache.
	* @param session the user info to extract the active session value.
	*/
	private async addUserSession(activeUser: UserActiveData): Promise<boolean> {
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
