use std::fmt::{ Debug, Display, Formatter, Result };

/// Crate and art work dimensions.
#[derive(Debug)]
pub enum Sizes {
	Values {
		x: f32, 
		z: f32,
		y: f32
	}
}


pub trait Hexagon {
	/// Return the sizes of the ArtWork or Crate.
	fn size(&self) -> &Sizes;

	/// Return the area calculation from the ArtWork or Crate.
	fn cub_area(&self) -> f32;

	/// Return the air company area calculation from the ArtWork or Crate.
	fn cub_aircomp_area(&self) -> f32;

	/// Converts the sizes from Inches to Centimeters.
	fn convert_to_cm(self) -> Self;

	/// Converts the sizes fromScentimeters to Inches.
	fn convert_to_in(self) -> Self;
}


impl Display for Sizes {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		match self {
			Sizes::Values { x, z, y } =>
				writeln!(f, "[x: {x}, z: {z}, y: {y}]")
		}
	}
}
