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
	const AUX = Array.isArray(works[0][0]) ? works[0] : works;
	
	AUX?.map(data => {
		let layer;

		if (Array.isArray(data))
			return(arts.push(data));
		for (layer in data) {
			arts.push(layer);
			data[layer].length === 1 ? arts.push(data[layer][0]) :
				!Array.isArray(data[0]) ?
					data[layer].map(work => arts.push(work)) :
					data[layer][0].map(work => arts.push(work));
		};
	});
	return(arts);
};


export function findCratesAndWorks ({ crates }) {
	let polygons =	[];
	let key;
	let tmp;

	for (key in crates) {
		if (crates[key].hasOwnProperty('crates')) {
			crates[key].crates.map((info, j) => {
				switch (j % 2) {
					case 0 :
						polygons.push(info);
						break ;
					case 1 :
						tmp = extractWorksLayers(info);
						tmp.map(arts => polygons.push(arts));
						tmp = null;
						break ;
				};
			}, 0);
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

		if (typeof(info) === 'string')
			return (`LAYER layer ${info?.at(-1)}:`);
		if (info.length >= 5) {
			line = `CODE: ${info[0]} - ${info[1]} x ${info[2]} x ${info[3]} - ${unit}`;
			return(line);
		}
		else if (info.length === 4) {
			line = `CRATE: ${info[0]} x ${info[1]} x ${info[2]} - ${unit}`;
			return(line);
		};
	});
	const getString =		JSON.stringify(formatted);
	const copyFinished =	charRemover(getString, formatted.length);
	navigator.clipboard.writeText(copyFinished);
};


function charRemover(target, len) {
	while(len--) {
		target = target.replace('LAYER','\t');
		target = target.replace('CODE: ','\t\t');
		target = target.replace('"','');
		target = target.replace('"','');
		target = target.replace(',','\n');
	}
	target = target.replace('[','');
	target = target.replace(']','');
	return(target);
};
