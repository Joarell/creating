export function switchMode(mode) {
	localStorage.setItem("mode", mode);
	changeMode(mode);
};


function changeMode (color) {
	const body = document.body.classList;

	body.remove("light-mode");
	body.remove("dark-mode");
	return (color === "dark" ? body.add("dark-mode"): body.add("light-mode"));
};
