use std::fmt::{ Debug, Display, Formatter, Result };

/**
  Crate and art work dimensions.
  */
pub struct Hexagon {
	pub x: u32,
	pub z: u32,
	pub y: u32
}

impl Debug for Hexagon {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		f.debug_struct("Hexagon")
		.field("x", &self.x)
		.field("z", &self.z)
		.field("y", &self.y).finish()
	}
}

impl Display for Hexagon {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		write!(f, "[x: {}, z: {}, y: {}]", self.x, self.z, self.y)
	}
}

