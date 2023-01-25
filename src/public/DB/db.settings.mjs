import * as pg from 'pg';
const PORT = process.env.PORT;
const USER = process.env.POSTGRES_USER;
const PASS = process.env.POSTGRES_PASSWORD;
const client = new pg.Client({
	host: 'localhost',
	port: PORT,
	user: USER,
	password: PASS,
});

console.log(client);


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
