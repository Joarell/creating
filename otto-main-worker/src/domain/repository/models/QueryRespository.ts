import { Reference, SolvedList } from "./EstimateType";
import { UserActiveData, UserInfoEntityData } from "./userData";


export interface iQueryDBService {
	get retrieveUserQueryDB(): Promise<UserInfoEntityData | undefined>;
};

export interface iQueryDBUser {
	retrieveEstimateQueryDB(user: UserActiveData,reference: Reference): Promise<SolvedList | undefined>;
};
