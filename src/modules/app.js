console.log("1");
setTimeout(() => {
	console.log("2");
}, 1000)
console.log("3");

async function f() {

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("Here we are!"), 5000)
	});

	let result = await promise;
	console.log(result);
}

f();
