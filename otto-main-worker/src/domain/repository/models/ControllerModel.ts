import { z } from "zod";
import { UserActiveData, UserLogin } from "./userData";
import { Reference, SolvedList } from "./EstimateType";
import { UserActive } from "../../ClassActiveUser";

const currency =		z.string();
export type Currency =	z.infer<typeof currency>;

export interface Controller {
	shiftTokens(): Promise<Response>;
	updatePassFrase(user: UserActiveData): Promise<Response>;
	get saveEstimateResult(): Promise<Response>;
	get updatePrevEstimate(): Promise<Response>;
	get searchEstimate(): Promise<Response>;
	get requestCurerncyAPI(): Promise<Response>;
	get addingNewUser(): Promise<Response>;
	get updateTokens(): Promise<Response>;
	get logOut(): Promise<Response>;
	get login(): Promise<Response>;
};
