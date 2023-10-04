

const setup = () => {
	const canvas = document.getElementById('art-background');
	const context = canvas.getContext('2d');
	const screenWidth = globalThis.innerWidth;
	const screenHeight = globalThis.innerHeight;

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	context.beginPath();
	context.fillStyle = "white";
	context.fillRect(100, 100, 200, 100);
	context.moveTo(10, 500)
	context.lineTo(100, 50)
	
	context.lineTo(100, 200)
	context.strokeStyle = "white";
	context.stroke();

	context.beginPath();
	context.strokeStyle = "white";
	context.arc(400, 100, 50, 0, Math.PI * 2, false);
	context.stroke();
	// console.log(Math.random());

	// createCanvas(w = windowWidth, windowHeight)
	// for (i = 0; i < w * n; i ++) {
	// 	points[i] = createVector(random(width), random(height));
	// };
	// background(19);
};

setup();

// const draw = () => {
// 	for (let p of points) {
// 		stroke (255);
// 		point(p.x, p.y);
// 	}
// 	t++;
// };
//
// setup();
// draw();
