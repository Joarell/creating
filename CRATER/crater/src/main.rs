use labors::{
	art_work::ArtWork,
	hexagon::{Hexagon, Sizes}
};


fn main() {
	let art_work: ArtWork = ArtWork {
		code: "LT-23809",
		sizes: &Sizes::Values {
			x: 100_f32,
			z: 5_f32,
			y: 100_f32
		},
	};

	art_work.show();
	println!("Cub {}", art_work.cub_area());
	println!("Cub Air value {}", art_work.cub_aircomp_area());
}
