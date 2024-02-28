

globalThis.fns = { loginInto };

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


async function setLogin(info) {
	if (info.msg === 'active')
		await appAccessCheckIn(info)
	else {
		warningDialog();
		alert('Wrong credentials. Please try again!');
	}
	return(info);
};


async function backEndLoginAuth(userInfo) {
	const USER =	JSON.stringify(userInfo);
	const url =		'/start';
	try {
		await fetch (url, {
			method: "POST",
			body: USER,
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		}).then(body => body.json())
		.then(setLogin)
		.catch(err => console.error(`Alert response ${err}`));
	}
	catch(err) {
		alert(`Attention attempt to login: ${err}`);
	};
};


async function appAccessCheckIn(userAuth) {
	const { result } =	userAuth;
	const header =	{
		'Authorization': `Bearer ${result[0]}`,
		'Content-Type': 'application/javascript',
		'Accept': 'text/html; text/css; application/javascript',
	};
	const request =		new Request(`/app`, {
		Method: "POST",
		Mode: 'cors',
		Headers: header,
		Cache: 'default',
		Credentials: 'include',
		Connection: 'keep-alive',
		Redirect: 'follow',
	});
	try {
		const checkOut = await fetch(request)
			.catch(err => alert(`Warning! ${err}`));

		if (checkOut.status <= 400)
			globalThis.location.assign(checkOut.url);
		else {
			alert("Not authorized. Please, try again!");
			globalThis.location.reload();
			throw new Error(checkOut.status);
		};
	}
	catch(err) {
		alert(`Attention redirection: ${err}`);
	};
};
