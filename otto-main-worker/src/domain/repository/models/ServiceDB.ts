import { Reference, SolvedList } from "./EstimateType";
import { UserActiveData, UserDataRequest, UserInfoEntityData, UserLogin } from "./userData";

export type Result = string | number | boolean | SolvedList | undefined;

export interface iServiceDB {
	loginCommandDB(newLogin: UserLogin): Promise<UserActiveData | undefined>;
	tokenCheckerValidation(user: UserActiveData): Promise<boolean | number>;
	saveEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<Result>;
	updateEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<Result>;
	retrieveEstimateDB(user: UserActiveData, reference: Reference): Promise<Result>;
	retrieveUserDB(user: UserDataRequest | UserLogin): Promise<UserInfoEntityData | undefined>;
	updateUserTokenDB(user: UserDataRequest): Promise<UserDataRequest | boolean>;
	updateUserPassPhrase(user: UserDataRequest, nesPassPhrase: string): Promise<boolean>;

	retrieveUserSession(user: UserDataRequest): Promise<UserActiveData | undefined>;
	logOutCommand(activeUser: UserActiveData): Promise<boolean>;
	checkUserActive(user: UserLogin): Promise<boolean | undefined>;
	addingNewUser(newUser: UserActiveData): Promise<boolean>;
};
