

globalThis.addEventListener("click", async () => {
	const url = 'http://localhost:3000/currency';
	const getter = await fetch(url).then(res => res.json());
	const { data } = getter;
	console.log(data);
});
