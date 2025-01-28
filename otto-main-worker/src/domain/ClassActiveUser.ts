import { iUserActive } from "./repository/models/ActiveUser";
import { UserActiveData } from "./repository/models/userData";
import { Reference, SolvedList } from "./repository/models/EstimateType";
import { Context } from "hono";
import { ServiceDB } from "./service/ServiceDB";


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
	async saveEstimate(estimate: SolvedList): Promise<boolean> {
		return(await this.services.saveEstimateDB(estimate, this.userAct));
	};

	/**
	* @param estimate has the list to be updated on DB.
	*/
	async updateEstimate(estimate: SolvedList): Promise<boolean> {
		return(await this.services.updateEstimateDB(estimate, this.userAct));
	};

	/**
	* @param reference is the string the found on DB.
	*/
	async searchEstimate(reference: Reference): Promise<SolvedList | undefined> {
		return(await this.services.retrieveEstimateDB(reference));
	};

	/**
	* @param user is the object with all information needed to update token pairs.
	*/
	async shiftTokens(user: UserActiveData): Promise<UserActiveData | boolean> {
		return(await this.services.updateUserTokenDB(user));
	};

	/**
	* @field return the user data information.
	*/
	get userInfo() {
		return(this.userAct);
	};
};
