//       ╭──────────────────────────────────────────────────────────────╮
//       │ ╭──────────────────────────────────────────────────────────╮ │
//       │ │           INFO: Here you find these functions:           │ │
//       │ │                    centimetersShift()                    │ │
//       │ │                      inchesShift()                       │ │
//       │ │                  measureSetupCheckout()                  │ │
//       │ │                      metersShift()                       │ │
//       │ │                   resolveConversion()                    │ │
//       │ │                     unitConvertion()                     │ │
//       │ ╰──────────────────────────────────────────────────────────╯ │
//       ╰──────────────────────────────────────────────────────────────╯


function unitConvertion (input1, input2, value1, value2) {
	const result = (input1 === "centimeters" ?
		centimetersShift(input1, input2, value1, value2) :
		input1 === "inches" ?
			inchesShift(input1, input2, value1, value2) :
			metersShift(input1, input2, value1, value2)
	);
	return (result);
};


function measureSetupCheckout(option1, option2){
	const checked = {
		checked1 :option1 === "centimeters" && option2 === "inches",
		checked2 :option1 === "inches" && option2 === "centimeters",
		checked3 :option1 === "meters" && option2 === "centimeters",
	};
	return (checked);
};


function resolveConversion(input1, input2, unit, type) {
	const roundDecimal = 1000;

	if (type !== "m")
		return (input1.value > input2.value ?
			~~((input1.value / unit) * roundDecimal) / roundDecimal:
			~~((input2.value * unit) * roundDecimal) / roundDecimal
		);
	return (input1.value < input2.value ?
		~~((input2.value / unit) * roundDecimal) / roundDecimal:
		~~((input1.value * unit) * roundDecimal) / roundDecimal
	);
};


function centimetersShift (unit1, unit2, measure1, measure2) {
	const inches =		2.54;
	const meters =		0.01;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return (
			measure1.value > measure2.value ? measure1.value: measure2.value
		);
	else if (cmpSetup.checked1)
		return(resolveConversion(measure1, measure2, inches, "in"));
	return(resolveConversion(measure1, measure2, meters, "m"));
};


function inchesShift (unit1, unit2, measure1, measure2) {
	const centimeters = 2.54;
	const meters =		0.0254;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return (
			measure1.value > measure2.value ? measure1.value: measure2.value
		);
	else if (cmpSetup.checked2)
		return(resolveConversion(measure1, measure2, centimeters, "cm"));
	return(resolveConversion(measure1, measure2, meters, "m"));
};


function metersShift (unit1, unit2, measure1, measure2) {
	const centimeters = 0.01;
	const inches =		0.0254;
	const cmpSetup =	measureSetupCheckout(unit1, unit2);

	if (unit1 === unit2)
		return (
			measure1.value > measure2.value ? measure1.value: measure2.value
		);
	else if (cmpSetup.checked3)
		return(resolveConversion(measure1, measure2, centimeters, "cm"));
	return(resolveConversion(measure1, measure2, inches, "in"));
};


globalThis.document.getElementById("input-unit1")
	.addEventListener("input", () => {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input2.value = 0;
	input2.value = unitConvertion(selected1, selected2, input1, input2);
});


globalThis.document.getElementById("input-unit2")
	.addEventListener("input", () => {
	const selected1 =	globalThis.document.getElementById("units1").value;
	const selected2 =	globalThis.document.getElementById("units2").value;
	const input1 =		globalThis.document.getElementById("input-unit1");
	const input2 =		globalThis.document.getElementById("input-unit2");

	input1.value = 0;
	input1.value = unitConvertion(selected1, selected2, input1, input2);
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
