


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
	const res = await fetch ( url, {
		method: "POST",
		body: JSON.stringify(userInfo),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		cache: 'default'
	}).then(body => body.json())
	.catch(err => console.error(`Alert ${err}`));

	console.log(res);
	res.msg === 'loged' ?
		await appAccessCheckin(res.tokens) :
		alert('Wrong credentials. Please try again!');
};


async function appAccessCheckin (userAuth) {
	const url		= '/app';
	const header	= {
		'Authorization': 'Bearer ' + userAuth[0],
	};
	const checkOut	= await fetch (url ,{
		method: "GET",
		headers: header,
		cache: 'default',
		redirect: 'follow',
		credentials: 'same-origin',
		cache: 'default',
		connection: 'keep-alive',
	}).catch(err => alert(`Warning! ${err}`));

	console.log(checkOut);
	console.log(checkOut.status);
	console.log(checkOut.url);
	if (checkOut.status <= 400)
		// console.log('Actived');
		globalThis.location.assign(checkOut.url);
	else {
		alert("Not authorized! Please, try again");
		globalThis.location.reload();
	}
};
