import { SolvedList } from "./EstimateType";
import { UserActiveData, UserDataRequest, UserInfoEntityData } from "./userData";


export interface iCommandDBService {
	saveExpiredAndShiftedTokens(user: UserInfoEntityData): Promise<boolean>;
	updateUserTokensCommandDB(user: UserInfoEntityData): Promise<UserInfoEntityData | boolean>;
	updateUserPassPhraseDB(user: UserDataRequest, newPass: string): Promise<boolean>;
	storeSuspiciousTokens(user: UserActiveData): Promise<boolean>;
};

export interface iCommandDBServiceEstimates {
	saveEstimateCommandDB(estimate: SolvedList): Promise<boolean | string>;
	updateEstimateCommandDB(estimate: SolvedList): Promise<boolean | string>;
};
