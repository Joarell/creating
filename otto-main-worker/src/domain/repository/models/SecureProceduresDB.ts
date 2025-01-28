import { UserInfoEntityData } from "./userData";

export interface iSecureProceduresDB {
	encryptPassFrase(pass: string, salt: string): string;
	passEncryptProcedures(user: UserInfoEntityData): Promise<string | boolean>;
	decryptChecker(hash: string): boolean;
	authTokenGEn(role: string): Promise<string>;
	refTokenGen(role: string): Promise<string>;
};
