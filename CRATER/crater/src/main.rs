use labors::{
	art_work::ArtWork,
	hexagon::{Converter, Hexagon, Sizes},
};

fn main() {
	let mut art_work = ArtWork {
		code: "LT-23809",
		sizes: Sizes::Values {
			x: 200_f32,
			z: 5_f32,
			y: 100_f32,
		},
	};
	let _value: Option<f32> = art_work.cub_area();

	art_work.show();
    println!("Value {_value:?}");
	println!("Cub {:?}", art_work.cub_area());
	println!("Cub Air value {:?}", art_work.cub_aircomp_area());
	println!("X {:?}", art_work.sizes);
	art_work = art_work.convert_to_in();
	art_work.show();
}
