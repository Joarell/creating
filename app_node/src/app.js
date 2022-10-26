let arr = [
	[10, 09, 11],
	[100, 05, 100]
];

let num0 = [100, 05, 100];
let num = 05;

let i = 0;
let found = (l, w) => {
	let aux;
	let i;

	i = 0;
	while (arr.length > i) {
		aux = l[i];
		if (aux.indexOf(w) != -1) {
			return l[i];
		}
		i++;
	}
}

console.log(found(arr, num));
