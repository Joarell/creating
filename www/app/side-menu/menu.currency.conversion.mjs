


function currencyName(list) {
	const fragment = document.createDocumentFragment();

	list.map(name => {
		const option = document.createElement("option");

		option.textContent = name;
		fragment.appendChild(option);
	});
	return(fragment);
};


async function populateCoins() {
	const coins =		JSON.parse(localStorage.getItem("currency"))
	const select1 =		document.getElementById("coin1");
	const select2 =		document.getElementById("coin2");
	const coinNames =	Object.keys(coins);

	if (!coins)
		return("Error");
	select1.appendChild(currencyName(coinNames));
	select2.appendChild(currencyName(coinNames));
};


function conversionCurrency(opt1, opt2, val1, val2) {
	const list =			JSON.parse(localStorage.getItem("currency"));
	const ROUND =			1000;
	const shiftInput1 =	(Number.parseFloat(val1.value) === list[opt1]);
	const shiftInput2 =	(Number.parseFloat(val2.value) === list[opt2]);

	if (opt1 === opt2)
		return(shiftInput1 ? val2.value: val1.value);
	else if (shiftInput1 && shiftInput2)
		return (~~((list[opt1] * list[opt2]) * ROUND) / ROUND);
	else if (list[opt1] < list[opt2]) {
		if (shiftInput1) {
			return (
				list[opt1] > list[opt2] ?
				~~(((val2.value / list[opt1]) * list[opt2]) * ROUND) / ROUND:
				~~(((val2.value / list[opt2]) * list[opt1]) * ROUND) / ROUND
			);
		}
		return (
			list[opt1] < list[opt2] ?
			~~(((val1.value * list[opt2]) / list[opt1]) * ROUND) / ROUND:
			~~(((val1.value * list[opt1]) / list[opt2]) * ROUND) / ROUND
		);
	}
	if (shiftInput2)
		return (
			list[opt1] > list[opt2] ?
			~~(((val1.value * list[opt2]) / list[opt1]) * ROUND) / ROUND:
			~~(((val1.value * list[opt1]) / list[opt2]) * ROUND) / ROUND
		);
	return (
		list[opt1] < list[opt2] ?
		~~(((val2.value / list[opt1]) * list[opt2]) * ROUND) / ROUND:
		~~(((val2.value / list[opt2]) * list[opt1]) * ROUND) / ROUND
	);
};


async function getCurrencyValue() {
	const url =			'/currency';
	const getCurrecy =	await fetch(url, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
	}).then(body => body.json()).catch(err => alert(`CurrencyError: ${err}!`));
	const { rates } =	getCurrecy.response;
	const storage =		globalThis.localStorage;

	return(rates && storage.setItem("currency", JSON.stringify(rates)));
};


function setValues (coin, place) {
	const currency = JSON.parse(localStorage.getItem("currency"));

	if (!currency)
		return(false);
	place.value = currency[coin];
};


globalThis.document.getElementById("coin-button")
	.addEventListener("click", () => {
	getCurrencyValue();
	populateCoins();
});

globalThis.document.getElementById("exchange-header")
	.addEventListener("click", async () => {
	const storageCurrency =	localStorage.getItem("currency");
	const coin1 =			JSON.parse(localStorage.getItem("coin1"));
	const coin2 =			JSON.parse(localStorage.getItem("coin2"));
	const opt1 =			document.getElementById("coin1");
	const opt2 =			document.getElementById("coin2");

	populateCoins();
	coin1 !== null ? opt1.value = coin1: false;
	coin2 !== null ? opt2.value = coin2: false;
	storageCurrency === null ? await getCurrencyValue(): false;
});

globalThis.document.getElementById("coin1")
	.addEventListener("change", () => {
	const coin =	document.getElementById("coin1").value;
	const input =	document.getElementById("coin1-input");

	localStorage.setItem("coin1", JSON.stringify(coin));
	setValues(coin, input);
});

globalThis.document.getElementById("coin2")
	.addEventListener("change", () => {
	const coin =	document.getElementById("coin2").value;
	const input =	document.getElementById("coin2-input");

	localStorage.setItem("coin2", JSON.stringify(coin));
	setValues(coin, input);
});

globalThis.document.getElementById("coin1-input")
	.addEventListener("input", () => {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt2, value2);
	value2.value =	conversionCurrency(opt1, opt2, value1, value2);
});

globalThis.document.getElementById("coin2-input")
	.addEventListener("input", () => {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt1, value1);
	value1.value =	conversionCurrency(opt1, opt2, value1, value2);
})
