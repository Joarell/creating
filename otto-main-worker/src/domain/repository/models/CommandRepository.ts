import { SolvedList } from "./EstimateType";
import { UserActiveData, UserInfoEntityData } from "./userData";


export interface iCommandDBService {
	updateUserAuthorizationCommandDB(user: UserInfoEntityData, freshUser: UserActiveData): Promise<boolean>;
	updateUserTokensCommandDB(user: UserInfoEntityData): Promise<UserInfoEntityData | boolean>;
};

export interface iCommandDBServiceEstimates {
	saveEstimateCommandDB(estimate: SolvedList): Promise<boolean>;
	updateEstimateCommandDB(estimate: SolvedList): Promise<boolean>;
};
