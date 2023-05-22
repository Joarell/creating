//    ╭─────────────────────────────────────────────────────────────────────╮
//    │ ╭─────────────────────────────────────────────────────────────────╮ │
//    │ │ INFO: Here you are going to find the currency interface caller. │ │
//    │ ╰─────────────────────────────────────────────────────────────────╯ │
//    ╰─────────────────────────────────────────────────────────────────────╯

import { getCurrencyValue, populateCoins, setValues, conversionCurrency }
from './core.currency.mjs';


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
