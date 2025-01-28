import { Reference, SolvedList } from "./EstimateType";
import { UserInfoEntityData } from "./userData";


export interface iQueryDBService {
	get retrieveUserQueryDB(): Promise<UserInfoEntityData | undefined>;
};

export interface iQueryDBUser {
	retrieveEstimateQueryDB(reference: Reference): Promise<SolvedList | undefined>;
};
