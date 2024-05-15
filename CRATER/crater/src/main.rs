use labors::{
	art_work::ArtWork,
	hexagon::{Hexagon, Sizes}
};


fn main() {
	let mut art_work = ArtWork {
		code: "LT-23809",
		sizes: Box::new(Sizes::Values {
			x: 100_f32,
			z: 5_f32,
			y: 100_f32
		}),
	};
	let cub_air: f32 = format!("{:.3}", art_work.cub_aircomp_area())
		.parse().unwrap();

	art_work.show();
	println!("Cub {:.3}", art_work.cub_area());
	println!("Cub Air value {}", cub_air);
	println!("X {:?}", art_work.sizes);
	art_work = art_work.convert_to_in();
	art_work.show();
}
