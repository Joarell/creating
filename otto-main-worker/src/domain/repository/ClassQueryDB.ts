import { iQueryDBService, iQueryDBUser } from "./models/QueryRespository";
import { UserInfoEntityData, UserLogin } from "./models/userData";
import { Reference, SolvedList } from "./models/EstimateType";
import { Context } from "hono";


/**
* @class query requests from ServiceDB about users on DB.
*/
export class QueryDBService implements iQueryDBService {
	private bindings: Context;
	private userData: UserLogin;

	constructor(user: UserLogin, bindings: Context) {
		this.bindings = bindings;
		this.userData = user;
	};

	/**
	* @method returns the available user entity on DB.
	* @param user the basic data to be found on DB.
	*/
	private async userSearchDB(): Promise<UserInfoEntityData | undefined> {
		try {
			const { results } = await this.bindings.env.DB1.prepare(`
				SELECT * FROM users WHERE name = ?;
			`).bind(this.userData.userName).all();
			const userInfo = UserInfoEntityData.safeParse(await results[0]);

			return(userInfo.success ? userInfo.data : undefined);
		}
		catch(e) {
			console.error(e);
			return(undefined);
		};
	};

	get retrieveUserQueryDB() {
		return(this.userSearchDB());
	};
};


/**
* @class query requests from ServiceDB about solved estimate/list on DB.
*/
export class QueryDBUserActions implements iQueryDBUser {
	private bindings: Context;

	constructor(bindings: Context) {
		this.bindings = bindings;
	};

	/**
	* @method returns the available estimate/list entity on DB.
	* @param value the estimate identification to be found on DB.
	*/
	async retrieveEstimateQueryDB(reference: Reference): Promise<SolvedList | undefined> {
		try{
			const { results } = await this.bindings.env.DB1.prepare(`
				SELECT * FROM users WHERE reference_id = ?;
			`).bind(reference).all();
			let estimate;

			results[0] ? estimate = SolvedList.safeParse(await results[0]).data: estimate;
			return (estimate);
		}
		catch(e) {
			//console.error(e);
			return(undefined)
		};
	};
};
