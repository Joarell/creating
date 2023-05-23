//         ╭──────────────────────────────────────────────────────────╮
//         │ ╭──────────────────────────────────────────────────────╮ │
//         │ │ INFO: Here you are goint to find the copy functions: │ │
//         │ │                    charRemover()                     │ │
//         │ │                 findCratesAndWorks()                 │ │
//         │ │                     findCrates()                     │ │
//         │ │                formatterClipBoard();                 │ │
//         │ ╰──────────────────────────────────────────────────────╯ │
//         ╰──────────────────────────────────────────────────────────╯


export function findCratesAndWorks ({ crates }) {
	let polygons;

	crates ?
		polygons = crates.filter(polygon => {
			return (
				(["Crate"].includes(polygon[0])) || (polygon.length === 5) ?
				polygon: false
			);
		}):
	false;
	return(formatterClipBoard(polygons));
};


export function findCrates ({ crates }) {
	let allCrates;

	crates ?
		allCrates = crates.filter(crate => {
			return (["Crate"].includes(crate[0]) ? crate: false);
		}):
	false;
	return(formatterClipBoard(allCrates));
};


function formatterClipBoard(crates) {
	if(!crates)
		return("There is no crates. Please, try again!");
	const formatted =	crates.map(info => {
		let line;
		const unit =	localStorage.getItem("metrica");

		line = `${info[0]} - ${info[1]} x ${info[2]} x ${info[3]} - ${unit}`;
		return(line);
	});
	const getString =		JSON.stringify(formatted);
	const copyFinished =	charRemover(getString, formatted.length);
	navigator.clipboard.writeText(copyFinished);
}


function charRemover(target, len) {
	let result = target;

	while(len--) {
		result = result.replace('"','');
		result = result.replace('"','');
		result = result.replace(',','\n');
	}
	result = result.replace('[','');
	result = result.replace(']','');
	return(result);
};
