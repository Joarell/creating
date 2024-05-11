use std::fmt::{ Debug, Display, Formatter, Result };

/**
 Crate and art work dimensions.
*/
#[derive(Debug)]
pub enum Sizes {
	Values {
		x: f32, 
		z: f32,
		y: f32
	}
}


pub trait Hexagon {
	fn size(&self) -> &Sizes;

	fn cub_area(&self) -> f32;

	fn cub_aircomp_area(&self) -> f32;
}


impl Display for Sizes {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		match self {
			Sizes::Values { x, z, y } =>
				writeln!(f, "[x: {x}, z: {z}, y: {y}]")
		}
	}
}
