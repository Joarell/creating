


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
		return (loginAuth(badge));
	alert(`Opss! Wrong credentials. Please try again!`);
};


async function loginAuth (userInfo) {
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
		await appAccess(res, userInfo) :
		// globalThis.location.replace('/app') :
		alert('Wrong credentials. Please try again!');
};


async function appAccess (data, user) {
	const url = '/app';
	const res = await fetch (url ,{
		method: "POST",
		body: JSON.stringify({
			id: user.name,
			refToken: data[0]
		}),
		cache: 'default'
	}).then(data => data.json())
	.catch(err => alert(`ALERT: ${err}`));

	console.log(res);
};
