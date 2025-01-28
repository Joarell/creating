import { Reference, SolvedList } from "./EstimateType";
import { Session } from "./LoginState";
import { NewUser, UserActiveData, UserInfoEntityData, UserLogin } from "./userData";

export interface iServiceDB {
	loginCommandDB(newLogin: UserLogin): Promise<UserActiveData | undefined>;
	saveEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<boolean>;
	updateEstimateDB(estimate: SolvedList, user: UserActiveData): Promise<boolean>;
	retrieveEstimateDB(reference: Reference): Promise<SolvedList | undefined>;
	retrieveUserDB(user: UserLogin): Promise<UserInfoEntityData | undefined>;
	updateUserTokenDB(user: UserActiveData): Promise<UserActiveData | boolean>;

	retrieveUserSession(session: Session): Promise<UserActiveData | undefined>;
	addUserSession(activeUser: NewUser): Promise<boolean>;
	logOutCommand(activeUser: UserActiveData): Promise<boolean>;
	checkUserActive(user: UserLogin): Promise<boolean>;
	addingNewUser(newUser: UserActiveData): Promise<boolean>;
};
