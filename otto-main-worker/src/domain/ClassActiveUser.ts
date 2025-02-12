import { iUserActive } from "./repository/models/ActiveUser";
import { UserActiveData, UserDataRequest } from "./repository/models/userData";
import { Reference, SolvedList } from "./repository/models/EstimateType";
import { Context } from "hono";
import { ServiceDB } from "./service/ServiceDB";
import { Result } from "./repository/models/ServiceDB";


/**
* @class the user methods available.
*/
export class UserActive implements iUserActive {
	private services: ServiceDB;
	private userAct: UserActiveData;

	/**
	* @param user all user data information.
	* @param bindings the CloudFlare connection object.
	*/
	constructor(user: UserActiveData, bindings: Context) {
		this.services =	new ServiceDB(bindings);
		this.userAct =	user;
	};

	/**
	* @param estimate has the list to be saved on DB.
	*/
	async saveEstimate(estimate: SolvedList): Promise<Result> {
		return(await this.services.saveEstimateDB(estimate, this.userAct));
	};

	/**
	* @param estimate has the list to be updated on DB.
	*/
	async updateEstimate(estimate: SolvedList): Promise<Result> {
		return(await this.services.updateEstimateDB(estimate, this.userAct));
	};

	/**
	* @param reference is the string the found on DB.
	*/
	async searchEstimate(reference: Reference): Promise<Result> {
		return(await this.services.retrieveEstimateDB(this.userAct, reference));
	};

	/**
	* @param user is the object with all information needed to update token pairs.
	*/
	async shiftTokens(user: UserDataRequest): Promise<UserDataRequest | boolean> {
		return(await this.services.updateUserTokenDB(user));
	};

	/**
	* @field return the user data information.
	*/
	get userInfo() {
		return(this.userAct);
	};
};
