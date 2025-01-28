import { UserActiveData, UserLogin } from "./userData";

export interface iKVQuery {
	get restoreUser(): Promise<UserActiveData | undefined>;
	userAlreadyActiveChecker(user: UserLogin): Promise<boolean>;
};
