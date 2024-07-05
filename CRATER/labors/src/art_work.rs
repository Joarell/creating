use std::fmt::{ Debug, Display, Formatter, Result };
use crate::hexagon::{ Converter, Hexagon, Sizes };


/// The art work composition with all information needed.
#[derive(Debug)]
pub struct ArtWork {
	pub code: &'static str,
	pub sizes: Sizes
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
		&self.sizes
	}

	fn cub_area(&self) -> Option<f32> {
		const CMTOM: f32 = 1_000_000.00;

		match self.sizes {
			Sizes::Values { x, z, y } =>
				Some((x * z * y ) / CMTOM)
		}
	}

	fn cub_aircomp_area(&self) -> Option<f32> {
		const CUBAIR: f32 = 6_000.00;

		match *self.size() {
			Sizes::Values { x, z, y } =>
				Some((x * z * y) / CUBAIR)
		}
	}
}


impl Converter for ArtWork {
	fn convert_to_cm(mut self) -> Self {
		match *self.size() {
			Sizes::Values { mut x, mut z, mut y } => {
				const INCH: f32 = 2.54;

				x /= INCH;
				z /= INCH;
				y /= INCH;
				self.sizes = Sizes::Values { x, z, y };
			}
		};
		self
	}

	fn convert_to_in(mut self) -> Self {

		match *self.size() {
			Sizes::Values { mut x, mut z, mut y } => {
				const INCH: f32 = 2.54;

				x *= INCH;
				z *= INCH;
				y *= INCH;
				self.sizes = Sizes::Values { x, z, y };
			}
		};
		self
	}
}


// ╭─────────────────────────────────────────────────────────╮
// │                          TESTS                          │
// ╰─────────────────────────────────────────────────────────╯

#[cfg(test)]
mod tests {
	 use super::*;

	#[test]
	fn cub_area() {
		let _art_work = ArtWork {
			code: "LT-23809",
			sizes: Sizes::Values {
				x: 100_f32,
				z: 5_f32,
				y: 100_f32,
			},
		};
		assert_eq!(_art_work.cub_area(), Some(0.05_f32));
		assert_eq!(_art_work.cub_aircomp_area(), Some(8.333333));
	}
}
