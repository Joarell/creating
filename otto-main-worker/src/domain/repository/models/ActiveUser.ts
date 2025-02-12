import { SolvedList } from "./EstimateType";
import { Result } from "./ServiceDB";
import { UserActiveData, UserDataRequest } from "./userData";

export interface iUserActive {
	saveEstimate(estimate: SolvedList): Promise<Result>;
	updateEstimate(estimate: SolvedList): Promise<Result>;
	searchEstimate(reference: string): Promise<Result>;
	shiftTokens(user: UserDataRequest): Promise<UserDataRequest | boolean>;
	get userInfo(): UserActiveData;
}
