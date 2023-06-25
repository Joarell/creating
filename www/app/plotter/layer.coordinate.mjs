

import { quickSort } from "../core/sort.system.mjs";


export async function getCrates(doc) {
	const dataIDB =	new Worker('./panels/worker.IDB.crates.mjs');
	return(new Promise((resolve, reject) => {
			dataIDB.postMessage(doc);
			dataIDB.onmessage = (solvedList => {
				solvedList.data !== undefined ?
					resolve(solvedList.data):
					reject(alert(`
"${doc}" NOT found. Please, try again or press 'Crate' button!`
				));
			});
		})
	);
};
