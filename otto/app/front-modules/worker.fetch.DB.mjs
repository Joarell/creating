


async function fetchDocDB () {
	const url		= '/search/estimates';
	const getter	= await fetch(url)
		.then(res => res
		.json()
		.then(info => info)
	);
	const codes		= getter.map(refe => {
		const { reference_id } = refe;
		return (reference_id);
	});
	return (codes);
};
