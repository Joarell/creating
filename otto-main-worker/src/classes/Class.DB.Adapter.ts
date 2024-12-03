import { OttoDB } from './ClassDB';
import { UserInfo, User, UserDB, Estimate, SolvedList } from '../types/type.schemas';
import { Context } from 'hono';
import { UserOttoApp } from './ClassUser';

/**
* @class This class is  and ADAPTER pattern to prepare operations to the super Class OttoDB.
*/
export class OttoDBHandler extends OttoDB {

	/**
	* @param request The worker properties to handle bindings.
	*/
	constructor(request: Context) {
		if (!request)
			return;
		super(request);
	};

	/**
	* @method All procedures needed to add a new user to the DB.
	*/
	async addNewUser(): Promise<Response> {
		let newUser = UserInfo.safeParse(await this.bindings.req.json());

		if (newUser.success) {
			const existUser = await this.grabUsers(newUser.data);
			return(
				!existUser.length ?
					await this.addUser(new UserOttoApp(newUser.data, this.bindings)):
					new Response('User already exist!', { status: 403 })
			);
		};
		return(
			new Response('It was not possible to add the new user', { status: 500 })
		);
	};

	/**
	* @method All procedures needed to authorize a new login and DB check-in.
	*/
	//TODO: set cookies to the success response.
	async newLogin(): Promise<Response> {
		const user = UserInfo.safeParse(await this.bindings.req.json());
		const check: UserDB | boolean = user.success ?
			await this.grabUsers(user.data) : false;

		if (check && user.success) {
			const passCheck: UserOttoApp = new UserOttoApp(user.data, this.bindings);

			if (passCheck.decryptPass(check[0].pass_frase)) {
				const loginDB: boolean | string = await this.loginUpdateTokens(check, passCheck);

				if (loginDB) {
					await this.bindings.env.OTTO_USERS.put(check[0].name, loginDB, { expirationTtl: 28800 });
					return(new Response('Authorized!',  { status: 200 }));
				};
				return(new Response('Not Authorized!', { status: 403 }));
			};
		};
		return(new Response('Credentials is not valid!', { status: 500 }));
	};

	async saveEstimate(): Promise<Response> {
		const request = await this.bindings.req.json();
		const estimate = SolvedList.safeParse(await request);
		console.log(request.crates.standardCrate.crates[1].works[1].layer2, estimate);
		return (new Response('ok', { status: 201 }));
	};

	async grabEstimates(estimate: string | number): Promise<Array> {};

	async sessionNumber(num: number): Promise<boolean> {};

	async suspiciousTokens(token: string): Promise<string> {};

	async oldTokens(user: UserInfo): Promise<Array> {};

	async updateData(estimate: estimateData): Promise<boolean> {};

	async storeSuspiciousTokens(token: string): Promise<boolean> {};

	async addUserNewToken(name: UserInfo, token: string): Promise<boolean> {};
}
