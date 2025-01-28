import { SolvedList } from "./EstimateType";
import { UserActiveData } from "./userData";

export interface iUserActive {
	saveEstimate(estimate: SolvedList): Promise<boolean>;
	updateEstimate(estimate: SolvedList): Promise<boolean>;
	searchEstimate(reference: string): Promise<SolvedList | undefined>;
	shiftTokens(user: UserActiveData): Promise<UserActiveData | boolean>;
	get userInfo(): UserActiveData;
}
