

export function populateOptions(crates) {
	const select =	document.getElementById('selected-crate');
	const unit =	localStorage
		.getItem("metrica") === 'cm - centimeters' ? 'cm' : 'in';

	select.innerHTML += crates.map((crate, i) => {
		if(crate[0] === 'Crate')
			return(`
				<option>
					Crate ${i}: ${crate[1]} x ${crate[2]} x ${crate[3]} - ${unit}
				</option>
			`);
	}, 0);
};
