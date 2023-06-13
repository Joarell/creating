


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
	alert(`Opss! Wrong credentials. Please try again!`);
};


async function backEndLoginAuth (userInfo) {
	const url = '/start';
	try {
		const res = await fetch ( url, {
			method: "POST",
			body: JSON.stringify(userInfo),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
		}).then(body => body.json())
		.catch(err => console.error(`Alert ${err}`));
		res.msg === 'loged' ?
			await appAccessCheckin(res) :
			alert('Wrong credentials. Please try again!');
	}
	catch(err) {
		alert(`Attention: ${err}`);
	}
	finally {
		return;
	}
};


async function appAccessCheckin (userAuth) {
	document.cookie = `id=${userAuth.id}; path=/; Secure`;
	const { tokens } =	userAuth;
	const header =	{
		'Authorization': `Bearer ${tokens[1]}`,
		'Content-Type': 'application/javascript',
		'Accept': 'text/html; text/css; application/javascript',
	};
	const request =		new Request(`/app`, {
		method: "POST",
		mode: 'cors',
		headers: header,
		cache: 'default',
		credentials: 'include',
		connection: 'keep-alive',
		redirect: 'follow',
	});
	try {
		const checkOut = await fetch(request)
			.catch(err => alert(`Warning! ${err}`));

		if (checkOut.status <= 400)
			globalThis.location.assign(checkOut.url);
		else {
			console.log(checkOut.status);
			alert("Not authorized. Please, try again!");
			globalThis.location.reload();
			throw new Error(checkOut.status);
		}
	}
	catch(err) {
		alert(`Attention: ${err}`);
	}
	finally {
		return;
	}
};
