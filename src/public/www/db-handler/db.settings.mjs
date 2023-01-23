import { Pool, Client } from 'pg';
const data = new Client({

});

//CREATE TABLE list_solved_into_crates (
//	reference_id VARCHAR(20),
//	work_code VARCHAR(20) UNIQUE,
//	lenght DECIMAL(3,3),
//	depth DECIMAL(3,3),
//	height DECIMAL(3,3),
//	crate_numb INT,
//	crate_sizes VARCHAR(20),
//	unit VARCHAR(3) DEFAULT 'cm',
//	cub_dimension,
//	user VARCHAR(20),
//	update TIMESTEMP,
//	creation DATA,
//	PRIMARY KEY(reference_id)
//);


//CREATE TABLE arrengement (
//	estimate VARCHAR(20),
//	crate_id INT,
//	art_code INT,
//	PRIMARY KEY(crate_id),
//	FOREIGN KEY(crate_id) REFERENCES list_solved_into_crates(crate_numb) ON DELETE CASCADE),
//	FOREIGN KEY(art_work) REFERENCES list_solved_into_crates(work_code) ON DELETE CASCADE),
//	FOREIGN KEY (estimate) REFERENCES list_solved_into_crates(reference_id) ON DELETE CASCADE);
//);


// ╭─────────────────────────╮
// │ Crate data base schema. │
// ╰─────────────────────────╯
export function createCrateTable () {

}


// ╭────────────────────────────────────╮
// │ Creates the user data base schema. │
// ╰────────────────────────────────────╯
export function createCrateUser () {
	
}
