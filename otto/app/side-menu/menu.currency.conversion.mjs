//    ╭─────────────────────────────────────────────────────────────────────╮
//    │ ╭─────────────────────────────────────────────────────────────────╮ │
//    │ │ INFO: Here you are going to find the currency interface caller. │ │
//    │ ╰─────────────────────────────────────────────────────────────────╯ │
//    ╰─────────────────────────────────────────────────────────────────────╯

import { getCurrencyValue, populateCoins, setValues, conversionCurrency }
from './core.currency.mjs';


export function coins() {
	getCurrencyValue();
	populateCoins();
};


export async function exchangeHeader() {
	const storageCurrency =	sessionStorage.getItem("currency");
	const coin1 =			JSON.parse(sessionStorage.getItem("coin1"));
	const coin2 =			JSON.parse(sessionStorage.getItem("coin2"));
	const opt1 =			document.getElementById("coin1");
	const opt2 =			document.getElementById("coin2");

	populateCoins();
	coin1 !== null ? opt1.value = coin1: false;
	coin2 !== null ? opt2.value = coin2: false;
	storageCurrency === null ? await getCurrencyValue(): false;
	setTimeout(document.getElementById("exchange-header").click(), 3000);
};


export function coinInputOne() {
	const coin =	document.getElementById("coin1").value;
	const input =	document.getElementById("coin1-input");

	sessionStorage.setItem("coin1", JSON.stringify(coin));
	setValues(coin, input);
};


export function coinInputTwo() {
	const coin =	document.getElementById("coin2").value;
	const input =	document.getElementById("coin2-input");

	sessionStorage.setItem("coin2", JSON.stringify(coin));
	setValues(coin, input);
};


export function getInputOne() {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt2, value2);
	value2.value =	`$ ${conversionCurrency(opt1, opt2, value1, value2)}`;
};


export function getInputTwo() {
	const opt1 =	document.getElementById("coin1").value;
	const opt2 =	document.getElementById("coin2").value;
	const value1 =	document.getElementById("coin1-input");
	const value2 =	document.getElementById("coin2-input");

	setValues(opt1, value1);
	value1.value =	`$ ${conversionCurrency(opt1, opt2, value1, value2)}`;
};
