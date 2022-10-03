//This is a replic of the pitagoras`s teorem.
// a**2 = b**2 + c**2
function pitagoras(a, b, c) {
	if (a && b && !c) {
		a = a ** 2;
		b = b ** 2;
		c = a - b;
		return (Math.floor(Math.sqrt(c)));
	}
	else if (a && !b && c) {
		a = a ** 2;
		c = c ** 2;
		b = a - c;
		return (Math.floor(Math.sqrt(b)));
	}
	else {
		b = b ** 2;
		c = c ** 2;
		a = b + c;
		return (Math.floor(Math.sqrt(a)));
	}
}

module.exports = { pitagoras };
