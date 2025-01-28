import { NewUser, UserActiveData, UserLogin } from "./domain/repository/models/userData";
import { Controller } from "./domain/repository/models/ControllerModel";
import { SolvedList } from "./domain/repository/models/EstimateType";
import { UserActive } from "./domain/ClassActiveUser";
import { LoginState } from "./domain/service/LoginStateService";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { ServiceDB } from "./domain/service/ServiceDB";
import { CookieOptions } from "hono/utils/cookie";

/**
* @class responsible to track each request from the API.
*/
export class ControllerAPI implements Controller {
	private Status = {
		success :		{ status: 200 },
		dataError :		{ status: 403 },
		serverError :	{ status: 501 },
		authError :		{ status: 401 },
		redirect :		{ status: 301 },
	};
	private bindings: Context;

	/**
	* @param bindings the CloudFlare link/connection.
	*/
	constructor(bindings: Context) {
		this.bindings = bindings;
	};

	/**
	* @method adds cookies after the login procedures.
	*/
	private setAllCookies(user: UserActive): Context {
		const dataUser = user.userInfo;
		const efemeralCookie:CookieOptions = {
			maxAge: 3,
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		};

		setCookie(this.bindings, "name", dataUser.userName, {
			maxAge: 43200,
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});
		setCookie(this.bindings, "session", dataUser.session, {
			maxAge: 43200,
			sameSite: "strict",
			secure: true,
		});
		setCookie(this.bindings, "userAuthToken", dataUser.authToken, efemeralCookie);
		setCookie(this.bindings, "userRefToken", dataUser.refToken, efemeralCookie);
		return(this.bindings);
	};

	/**
	* @method extracts the user login from json request object.
	*/
	private async extractUserAuthentication(): Promise<UserLogin | undefined> {
		const request = await this.bindings.req.json();
		const { userName, passFrase } = request;

		return(UserLogin.safeParse({ userName, passFrase }).data);
	};

	/**
	* @method executes the user login procedures.
	*/
	private async userLogin(): Promise<Response> {
		const user = await this.extractUserAuthentication();
		let response: undefined | Response;
		let active;

		if (user !== undefined) {
			const STATE =		new LoginState(this.bindings);
			active =			await STATE.checkUserLoggedIn(user);
			const findUser =	active ? false : await STATE.logIn(user);

			if (findUser) {
				response = new Response(
					JSON.stringify(findUser), this.Status.success
				);
				this.setAllCookies(findUser);
			};
		};

		return(
			response !== undefined ?
				response: new Response("User not found!", this.Status.authError)
		) satisfies Response;
	};

	/**
	* @method call the logout procedures.
	* @param user object with all data from the active user.
	*/
	private async logOutUser(): Promise<Response> {
		const state = new LoginState(this.bindings);
		const user = await state.restoringUser;
		const logOut = user !== undefined ? state.logOut : false;

		return (
			logOut ?
				new Response("Success!", this.Status.success):
				new Response("User not Found!", this.Status.serverError)
		);
	};

	/**
	* @method call the Service class to execute the save rocedures.
	* @param SolvedList  the solved list from the Otto App.
	*/
	private async saveEstimate(): Promise<Response> {
		const request =		await this.bindings.req.json();
		const solvedResult = SolvedList.safeParse(request).data;
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const result =		userActive && solvedResult !== undefined ?
			await userActive.saveEstimate(solvedResult): false;

		return(
			result ?
			new Response("Success!", this.Status.success) :
			new Response("Error!", this.Status.dataError)
		);
	};

	/**
	* @method call the Service class to execute the update procedures.
	* @param SolvedList  the solved list from the Otto App.
	*/
	private async updateEstimate(): Promise<Response> {
		const request =		await this.bindings.req.json();
		const newResult =	SolvedList.safeParse(request).data;
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const result =		userActive && newResult !== undefined ?
			await userActive.updateEstimate(newResult): false;

		return(
			result ?
			new Response("Success!", this.Status.success) :
			new Response("Error!", this.Status.dataError)
		);
	};

	/**
	* @method use it to pass same estimate reference ID to find in DB.
	* @param reference the unique reference to be found.
	*/
	async findEstimate(): Promise<Response> {
		const reference =	this.bindings.req.param('ref_id');
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const result =		userActive ? await userActive.searchEstimate(reference): false;

		return(
			result ?
			new Response(JSON.stringify(result), this.Status.success) :
			new Response("Error!", this.Status.dataError)
		);
	};

	/**
	* @method call the Service Class to execute the secure shift user token pairs.
	* @param user object with all data from the active user.
	*/
	async shiftTokens(): Promise<Response> {
		const request =		await this.bindings.req.json();
		const user = 		UserActiveData.safeParse(request).data;
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const result =		userActive && user !== undefined ?
			UserActiveData.safeParse(await userActive.shiftTokens(user)).data:
			false;
		const tokens =		result ? {
				authToken: result.authToken, refToken: result.refToken
			}: false;

		return(
			tokens ?
			new Response(JSON.stringify(tokens), this.Status.success) :
			new Response("Error!", this.Status.dataError)
		);
	};

	/**
	* @method call the Service Class to execute the secure change the user pass frase.
	* @param user object with all data from the active user.
	*/
	async updatePassFrase(user: UserActiveData): Promise<Response> {};

	/**
	* @method exutes all secure procedures to add a new Otto user.
	* @param newUser object with all basic user data to be added.
	*/
	private async addNewUser(): Promise<Response> {
		const request =		await this.bindings.req.json();
		const userData =	NewUser.safeParse(request);
	    const service =		new ServiceDB(this.bindings);
		const result =		userData.success ?
			await service.addingNewUser(userData.data): false;

		return (
			 result ?
				new Response("Success!", this.Status.success):
				new Response("User not Found!", this.Status.dataError)
		);
	};


	/**
	* @method returns all market currency object
	* @param user active user needed to request API.
	*/
	private async currencyAPI(): Promise<Response> {
		const key =		this.bindings.env.API_KEY2;
		const headers: Headers = new Headers();
		const url =		`https://api.currencybeacon.com/v1/latest?api_key=${key}`;
		headers.append("apikey", key);
		const request: Request = new Request(url, {
			method: 'GET',
			headers,
			redirect: 'follow'
		});
		const response = await fetch(request)
			.then(resp => resp.json())
			.catch(e => e)

		return(
			response ?
				new Response(JSON.stringify(response), this.Status.success):
				new Response("API failures request!", this.Status.serverError)
		);
	};

	get requestCurerncyAPI() {
		return(this.currencyAPI());
	};

	get addingNewUser() {
		return(this.addNewUser());
	};

	get saveEstimateResult() {
		return(this.saveEstimate());
	};

	get updatePrevEstimate() {
		return(this.updateEstimate());
	}

	get searchEstimate() {
		return(this.findEstimate());
	}

	get updateTokens() {
		return(this.shiftTokens());
	};

	get logOut() {
		return(this.logOutUser());
	}

	get login() {
		return(this.userLogin());
	};
};
