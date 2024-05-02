use labors::{
	art_work::ArtWork,
	hexagon::Hexagon
};


fn main() {
	let art_work: ArtWork = ArtWork {
		code: String::from("LT-23809"),
		sizes: Hexagon {
			x: 100,
			z: 5,
			y: 100
		},
		cub_area: 100.00
	};
	art_work.show();
}
