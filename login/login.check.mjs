import { address } from './otto.address.mjs';

//globalThis.fns = { loginInto };

globalThis.onkeydown = (keyPress) => {
	if (keyPress.key === 'Enter')
		loginInto ();
};


// TODO: change the span from 7 to 20.
function checkingPass (passFrase) {
	if (passFrase.length < 7)
		return (true);

	const regex = /['+"+\\+]/gm;
	return (regex.test(passFrase));
};


export function loginInto () {
	const userName	= document.getElementById("user-name").value;
	const userPass	= document.getElementById("passFrase").value;
	const badge		= {
		name: userName,
		passFrase: userPass
	};

	if (userName && !checkingPass (userPass))
		return (backEndLoginAuth(badge));
	// document.getElementById("warning").open = true;
	alert(`Opss! Wrong credentials. Please try again!`);
};

async function takeLogin(userLogin) {
	const url = `${address}/takeLogin/${userLogin.name}`;

	if (confirm("This USER is already logged in. Would you like to take it?")){
		await fetch(url, {
			method: "GET",
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Cross-Origin-Resource-Policy': 'same-site'
			},
		}).then(body => body.status)
		.then(status => status === 303 ? backEndLoginAuth(userLogin) : status)
		.catch(err => console.error(`Check this out: ${err}`));
	}
};


async function setLogin(info, userData) {
	switch (info.msg) {
		case 'active':
			return (await appAccessCheckIn(info));
		case "ended":
			return (await takeLogin(userData));
		default:
			alert('Wrong credentials. Please try again!');
	};
	return(info);
};


async function backEndLoginAuth(userInfo) {
	const form =	document.getElementById('login');
	const url =		new URL('https://solver.ottocratesolver.com/start');
	const app =		new URL('https://solver.ottocratesolver.com/app');

	console.count();
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		await fetch(url, {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(userInfo),
		}).then(serv => serv.status === 200 ? globalthis.location.assign(app) : serv)
		.then(res => setLogin(res, userInfo))
		.catch(await takeLogin(userInfo));
	});
	return;
};


async function appAccessCheckIn({ result, access }) {
	const header = {
		'Authorization': `Bearer ${result[0]}`,
		'Content-Type': 'application/javascript',
		'Accept': 'text/html; text/css; application/javascript',
	};
	const request = new Request(`${address}/app`, {
		method: "POST",
		mode: 'no-cors',
		headers: header,
		cache: 'default',
		connection: 'keep-alive',
		redirect: 'follow',
	});
	const checkOut = await fetch(request).catch(err => alert(`Warning! ${err}`));

	if (checkOut.status <= 201) {
		globalThis.localStorage.setItem('tier', access);
		globalThis.location.assign(checkOut.url);
	}
	else {
		alert("Not authorized. Please, try again!");
		globalThis.location.reload();
		throw new Error(checkOut.status);
	};
};
