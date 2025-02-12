import { z } from "zod";
import { UserActiveData, UserLogin } from "./userData";
import { UserActive } from "../../ClassActiveUser";

const session =			z.string();
export type Session =	z.infer<typeof session>;

export interface iLoginState {
	logIn(user: UserLogin): Promise<UserActive | undefined>;
	logOut(user: UserActiveData): Promise<boolean>;
	checkUserLoggedIn(user: UserLogin): Promise<boolean | undefined>;
	get restoringUser(): Promise<UserActive | undefined>;
};
