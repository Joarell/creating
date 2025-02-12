import { z } from "zod";
import { Session } from "./LoginState";

const UserName =		z.string();
export type UserName =	z.infer<typeof UserName>;

export interface iKVQuery {
	get restoreUser(): Promise<string | undefined>;
	set definesSession(session: Session);
	userAlreadyActiveChecker(userName: UserName): Promise<boolean>;
};
