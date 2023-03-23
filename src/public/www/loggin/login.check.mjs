


globalThis.onload= () => {
	globalThis.sessionStorage.setItem("test", "tested");
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
	const url = '/login';
	const res = await fetch ( url, {
		method: "POST",
		body: JSON.stringify(userInfo),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		cache: 'default'
	}).then(body => body.json())
	.catch(err => console.error(`Alert ${err}`));

	loginCluster(res);
};


function loginCluster (msg) {
	const getter = () => {
		return (msg);
	};
	return (console.log(getter()));
};
