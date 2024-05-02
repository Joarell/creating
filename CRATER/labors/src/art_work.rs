use std::fmt::{ Debug, Display, Formatter, Result };
use crate::hexagon::Hexagon;


/**
  The art work composition with all information needed.
  */
#[derive(Debug)]
pub struct ArtWork {
	pub code: String,
	pub sizes: Hexagon,
	pub cub_area: f32
}

impl Display for ArtWork {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		write!(f, "code: {}, size: {}, cub_area: {}",
			self.code, self.sizes, self.cub_area
		)
	}
}

impl ArtWork {
	/// Print all data from an art work.
	pub fn show(&self) {
		print!("{}", &self)
	}
}
