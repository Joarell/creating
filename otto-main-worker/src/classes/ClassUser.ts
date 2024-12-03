import { z } from 'zod';
import { User } from '../types/type.schemas';
import { Jwt } from 'hono/utils/jwt';
import { Context } from 'hono';
import { scryptSync, randomBytes } from "crypto";


/**
* @class This class represents the user abstraction based on data and actions on the system.
*/
export class UserOttoApp {
	private userData: User;
	private bindings: Context;

	/**
	* @param user The user data from DB.
	* @param bindings The context from Hono and Cloudflare worker.
	*/
	constructor(readonly user: User, readonly bindings: Context) {
		this.userData = user;
		this.bindings = bindings;
	};

	/**
	* @param pass The pass frase to encrypt;
	* @param salt The increment to add in the encryption procedure;
	*/
	private encryptPassWord(pass: string, salt: string): string {
		return(scryptSync(pass, salt, 32).toString('hex'));
	};

	/**
	* @param pass Pass frase to be compare to the stored hash;
	* @param hash The hash setup to compare;
	*/
	private decryptChecker(hash: string): boolean {
		const salt = hash.slice(64);
		const originalPassHash = hash.slice(0, 64);
		const currentPassHash = this.encryptPassWord(this.userData.passFrase, salt);

		return(originalPassHash === currentPassHash);
	};

	/**
	* @param passFrase passFrase to be encrypted.
	*/
	private passEncryptProcedure(): string | number {
		try {
			const salt = randomBytes(20).toString('hex');
			const hashed = this.encryptPassWord(this.userData.passFrase, salt) + salt;
			return(hashed)
		}
		catch(e) {
			console.error(`Pass encryption failed: ${e}`);
			return(500);
		}
	}

	/**
	* @param userName the name of user to compose the new token.
	*/
	private async authTokenGen(role: string = 'user'): Promise<string> {
		const exp: number = ~~((Date.now() / 1000) + 3600 * 8);
		const payload = { sub:this.userData.userName, role, exp };

		try{
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e)
			return('Auth token Error!');
		};
	};

	/**
	* @param userEmail the email of user to compose the new refresh token.
	*/
	private async refTokenGen(role: string = 'user'): Promise<string> {
		const payload = { sub: this.userData.email, role };

		try {
			const authToken = await Jwt.sign(
				payload,
				this.bindings.env.REF_SECRET_TOKEN,
			);
			return(authToken);
		}
		catch(e){
			console.error(e);
			return('REF Token Error!');
		};
	};

	get userName() {
		return(this.userData.userName);
	};

	get email() {
		return(this.userData.email);
	};

	get lastName() {
		return(this.userData.lastName);
	};

	get companyName() {
		return(this.userData.companyName);
	};

	get access() {
		return(this.userData.access);
	};

	get birthDay() {
		return(this.userData.birthDay);
	};

	get authToken(): Promise<string> {
		return(this.authTokenGen('user'));
	};

	get refToken(): Promise<string> {
		return(this.refTokenGen('user'));
	};

	get passEncrypted(): string | number {
		return(this.passEncryptProcedure());
	};

	decryptPass(hash: string): boolean {
		return(this.decryptChecker(hash));
	};
};
