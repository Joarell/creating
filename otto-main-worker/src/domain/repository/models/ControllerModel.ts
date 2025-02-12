import { z } from "zod";
import { Context } from "hono";

const currency =		z.string();
export type Currency =	z.infer<typeof currency>;

export interface Controller {
	shiftTokens(): Promise<Response>;
	get saveEstimateResult(): Promise<Response | Context>;
	get updatePrevEstimate(): Promise<Response | Context>;
	get searchEstimate(): Promise<Response | Context>;
	get requestCurerncyAPI(): Promise<Response>;
	get addingNewUser(): Promise<Response>;
	get updateTokens(): Promise<Response>;
	get updateUserPass(): Promise<Response>;
	get logOut(): Promise<Response>;
	get login(): Promise<Response>;
};
