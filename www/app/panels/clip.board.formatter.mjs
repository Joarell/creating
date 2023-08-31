// ╭──────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────╮ │
// │ │ INFO: Here you are goint to find the copy functions: │ │
// │ │                    charRemover()                     │ │
// │ │                 findCratesAndWorks()                 │ │
// │ │                     findCrates()                     │ │
// │ │                formatterClipBoard();                 │ │
// │ ╰──────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────╯


function extractWorksLayers({ works }) {
	let arts = [];
	
	works?.map(data => {
		let layer;

		for (layer in data) {
			arts.push(layer);
			data[layer].length === 1 ? arts?.push(data[layer][0]) :
				data[layer]?.map(arts => arts?.push(arts));
		};
	});
	return(arts);
};


export function findCratesAndWorks ({ crates }) {
	let polygons =	[];
	let val;
	let key;
	let tmp;

	for (key in crates) {
		val = 0;
		if (crates[key].hasOwnProperty('crates')) {
			val === 0 ? val = 1 : val += 2;
			polygons.push(crates[key].crates[val - 1]);
			tmp = extractWorksLayers(crates[key].crates[val]);
			tmp.map(arts => polygons.push(arts));
		};
	}
	sessionStorage.setItem("copy2", "done!");
	return(formatterClipBoard(polygons));
};


export function findCrates ({ crates }) {
	sessionStorage.setItem("copy1", "done!");
	return(formatterClipBoard(crates.allCrates));
};


function formatterClipBoard(data) {
	if(!data)
		return("There is no crates. Please, try again!");
	const unit =		localStorage.getItem("metrica") === 'cm - centimeters'?
		'cm' : 'in';
	const formatted =	data.map(info => {
		let line;

		if (info.length === 5) {
			line = `'\t'CODE: ${info[0]} - ${info[1]} x ${info[2]} x ${info[3]} - ${unit}`;
			return(line);
		}
		else if (info.length === 4) {
			line = `CRATE: ${info[0]} x ${info[1]} x ${info[2]} - ${unit}`;
			return(line);
		}
		return(info);
	});
	const getString =		JSON.stringify(formatted);
	const copyFinished =	charRemover(getString, formatted.length);
	navigator.clipboard.writeText(copyFinished);
}


function charRemover(target, len) {
	// console.log(target);

	while(len--) {
		target = target.replace('"','');
		target = target.replace('"','');
		target = target.replace(',','\n');
	}
	target = target.replace('[','');
	target = target.replace(']','');
	return(target);
};
