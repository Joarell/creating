//     ╭──────────────────────────────────────────────────────────────────╮
//     │ ╭──────────────────────────────────────────────────────────────╮ │
//     │ │ INFO: Here you are going to find the units interface caller. │ │
//     │ ╰──────────────────────────────────────────────────────────────╯ │
//     ╰──────────────────────────────────────────────────────────────────╯


import { unitConversion } from './core.units.mjs';


globalThis.document.getElementById("input-unit1")
	.addEventListener("input", () => {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input2.value = 0;
	input2.value = unitConversion(selected1, selected2, input1, input2);
});


globalThis.document.getElementById("input-unit2")
	.addEventListener("input", () => {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input1.value = 0;
	input1.value = unitConversion(selected1, selected2, input1, input2);
});


globalThis.document.getElementById("units1")
	.addEventListener("change", () => {
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input1.value = 0
	input2.value = 0
});


globalThis.document.getElementById("units2")
	.addEventListener("change", () => {
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input1.value = 0
	input2.value = 0
});
