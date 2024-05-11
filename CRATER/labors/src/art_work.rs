use std::fmt::{ Debug, Display, Formatter, Result };
use crate::hexagon::{ Hexagon, Sizes };


/**
  The art work composition with all information needed.
*/
#[derive(Debug)]
pub struct ArtWork {
	pub code: &'static str,
	pub sizes: &'static Sizes,
}


impl Display for ArtWork {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		writeln!(f, "code: {}, size: {}", self.code, self.sizes)
	}
}


impl ArtWork {
	/// Print all data from an art work.
	pub fn show(&self) {
		print!("{}", &self)
	}
}


impl Hexagon for ArtWork {
	fn size(&self) -> &Sizes {
		self.sizes
	}

	fn cub_area(&self) -> f32 {
		const CMTOM: f32 = 1_000_000.00;

		match *self.size() {
			Sizes::Values { x, z, y } =>
				(x * z * y ) / CMTOM
		}
	}

	fn cub_aircomp_area(&self) -> f32 {
		const CUBAIR: f32 = 6_000.00;

		match *self.size() {
			Sizes::Values { x, z, y } =>
				(x * z * y ) / CUBAIR
		}
	}
}
