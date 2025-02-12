import { NewUser, UserDataRequest, UserLogin } from "./domain/repository/models/userData";
import { Controller } from "./domain/repository/models/ControllerModel";
import { SolvedList } from "./domain/repository/models/EstimateType";
import { UserActive } from "./domain/ClassActiveUser";
import { LoginState } from "./domain/service/LoginStateService";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { ServiceDB } from "./domain/service/ServiceDB";
import { CookieOptions } from "hono/utils/cookie";
import { Result } from "./domain/repository/models/ServiceDB";


// TODO: log out user after finished the request when it has new log in.
// BUG: all consecutive logins are with the same token pairs.
/**
* @class responsible to track each request from the API.
*/
export class ControllerAPI implements Controller {
	private HttpStatus = {
		success :		{ status: 200 },
		redirect :		{ status: 301 },
		authError :		{ status: 401 },
		forbidden :		{ status: 403 },
		notFound :		{ status: 404 },
		notAcceptable :	{ status: 406 },
		conflict:		{ status: 409 },
		serverError :	{ status: 501 },
	};
	private readonly bindings: Context;

	/**
	* @param bindings the CloudFlare link/connection.
	*/
	constructor(bindings: Context) {
		this.bindings = bindings;
	};

	/**
	* @method adds cookies after the login procedures. */
	private setAllCookies(user: UserActive): Context {
		const dataUser = user.userInfo;
		const efemeralCookie:CookieOptions = {
			maxAge:		3,
			httpOnly:	true,
			sameSite:	"strict",
			secure:		true,
		};

		setCookie(this.bindings, "name", dataUser.userName, {
			maxAge:		43200,
			httpOnly:	true,
			sameSite:	"strict",
			secure:		true,
		});
		setCookie(this.bindings, "session", dataUser.session, {
			maxAge:		43200,
			sameSite:	"strict",
			secure:		true,
		});
		setCookie(this.bindings, "userAuthToken", dataUser.authToken, efemeralCookie);
		setCookie(this.bindings, "userRefToken", dataUser.refToken, efemeralCookie);
		return(this.bindings);
	};

	/**
	* @method extracts the user login from json request object.
	*/
	private async extractUserAuthentication(): Promise<UserLogin | undefined> {
		const reg = new RegExp('^([a-z]|[A-Z]|[0-9]){4,15}$');
		const request = await this.bindings.req.json();
		const { userName, passPhrase } = request;
		const validData = UserLogin.safeParse({ userName, passPhrase });
		const sanitize = reg.test(userName) && reg.test(passPhrase);

		return(validData.success && sanitize ? validData.data : undefined);
	};

	/**
	* @method executes the user login procedures.
	*/
	private async userLogin(): Promise<Response> {
		const user = await this.extractUserAuthentication();
		let active;

		if (user !== undefined) {
			const STATE =		new LoginState(this.bindings);
			const took =		this.bindings.req.path.split('/')[3] === 'boot';
			active =			await STATE.checkUserLoggedIn(user);
			const findUser =	!active || took ? await STATE.logIn(user): false;

			if (findUser) {
				this.setAllCookies(findUser);
				const { userName, session, authToken, refToken } = findUser.userInfo;
				const data = { userName, session, authToken, refToken };

				return(new Response(JSON.stringify(data), this.HttpStatus.success));
			};
		};

		return (active && user ?
			new Response("User is already logged in!", this.HttpStatus.forbidden):
			new Response("User not found!", this.HttpStatus.authError)
		);
	};

	/**
	* @method call the logout procedures.
	* @param user object with all data from the active user.
	*/
	private async logOutUser(): Promise<Response> {
		const state =	new LoginState(this.bindings);
		const user =	await state.restoringUser;
		const logOut =	user !== undefined ? state.logOut(user.userInfo) : false;

		return (
			logOut ? new Response("Success!", this.HttpStatus.success):
				new Response("User not Found!", this.HttpStatus.serverError)
		);
	};

	/**
	* @method returns all options to the user action.
	* @param option the response after all procedures on request.
	*/
	private userResponseOption(option: Result): Response | Context {
		switch(option) {
			case true:
				return(new Response("Success!", this.HttpStatus.success));
			case false:
				return(new Response("Error!", this.HttpStatus.forbidden));
			case 301:
				return(this.bindings.redirect('https://app.ottocratesolver.com/login', 301));
			case 'Estimate already exists!':
				return(new Response("Duplicated!", this.HttpStatus.conflict));
			case undefined:
				return(new Response("Not found!", this.HttpStatus.notFound));
			default:
				return(new Response(JSON.stringify(option), this.HttpStatus.success));
		};
	};

	/**
	* @method call the Service class to execute the save rocedures.
	* @param SolvedList  the solved list from the Otto App.
	*/
	private async saveEstimate(): Promise<Response | Context> {
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const request =		await this.bindings.req.json();
		const listParsed =	SolvedList.safeParse(request.result);

		if (userActive && listParsed.success) {
			const saved = await userActive.saveEstimate(listParsed.data);
			return(this.userResponseOption(saved));
		};
		return(new Response("Error!", this.HttpStatus.forbidden));
	};

	/**
	* @method call the Service class to execute the update procedures.
	* @param SolvedList  the solved list from the Otto App.
	*/
	private async updateEstimate(): Promise<Response | Context> {
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		const request =		await this.bindings.req.json();
		const newResult =	SolvedList.safeParse(request.result);

		if (userActive !== undefined && newResult.success){
			const result = await userActive.updateEstimate(newResult.data);
			return(this.userResponseOption(result));
		};

		return(new Response("Error!", this.HttpStatus.forbidden));
	};

	/**
	* @method use it to pass same estimate reference ID to find in DB.
	* @param reference the unique reference to be found.
	*/
	async findEstimate(): Promise<Response | Context> {
		const reference =	this.bindings.req.param('ref_id');
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;

		if (userActive === undefined)
			return(new Response("Error!", this.HttpStatus.forbidden));

		const result = userActive ? await userActive.searchEstimate(reference): false;
		return(this.userResponseOption(result));
	};

	/**
	* @method call the Service Class to execute the secure shift user token pairs.
	* @param user object with all data from the active user.
	*/
	async shiftTokens(): Promise<Response> {
		const { user } =	await this.bindings.req.json();
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		let result;

		if(userActive && user) {
			const userReq = UserDataRequest.safeParse(user);
			result =		userReq.success ?
				UserDataRequest.safeParse(await userActive.shiftTokens(userReq.data)).data:
				false;
		};

		return(
			result ?
			new Response(JSON.stringify(result), this.HttpStatus.success) :
			new Response("Error!", this.HttpStatus.forbidden)
		);
	};

	/**
	* @method call the Service Class to execute the secure change the user pass phrase.
	*/
	private async updatePassPhrase(): Promise<Response> {
		const { user } = await this.bindings.req.json();
		const userData = UserDataRequest.safeParse(user);
		let state;

		if (userData.success) {
			const SERVICE =		new ServiceDB(this.bindings);
			const { newPassPhrase } = await this.bindings.req.json();
			const check1 = newPassPhrase !== undefined && newPassPhrase !== null;
			const check2 = newPassPhrase.trim().length > 0;

			state =	check1 && check2?
				await SERVICE.updateUserPassPhrase(userData.data, newPassPhrase): undefined;
		};

		return(
			!state || state === undefined ?
			new Response('Invalid data!', this.HttpStatus.notAcceptable):
			new Response('Success!', this.HttpStatus.success)
		);
	};

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
				new Response("Success!", this.HttpStatus.success):
				new Response("User not Found!", this.HttpStatus.forbidden)
		);
	};

	/**
	* @method returns all market currency object
	* @param user active user needed to request API.
	*/
	private async currencyAPI(): Promise<Response> {
		const state =		new LoginState(this.bindings);
		const userActive =	await state.restoringUser;
		if(userActive === undefined)
			return(new Response("Error!", this.HttpStatus.forbidden));
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
				new Response(JSON.stringify(response), this.HttpStatus.success):
				new Response("API failures request!", this.HttpStatus.serverError)
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

	get updateUserPass() {
		return(this.updatePassPhrase())
	};

	get logOut() {
		return(this.logOutUser());
	}

	get login() {
		return(this.userLogin());
	};
};
