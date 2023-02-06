import { connectDB } from "./db.settings.js";


const connected = await connectDB('5432', 'jev', 'EnterNight90');
// const ref = `'PED-TEST'`;
// const crates = (`'{
// 	"crates":[
// 		["Final", 223, 46, 228, 2.338],
// 		["Final", 211, 113, 118, 2.813]
// 	]
// }'`);
// const arts = (`'{
// 	"list":[
// 		{"code":"0901", "x":90, "z": 90, "y":94},
// 		{"code":"0902", "x":91, "z": 90, "y":105},
// 		{"code":"0907", "x":96, "z": 90, "y":140},
// 		{"code":"0908", "x":97, "z": 84, "y":145}
// 	]
// }'`);
// const insert = `INSERT INTO data.done(
// reference, crates, works, user_name, user_id)
// VALUES (${ref}, ${crates}, ${arts}, 'JEV', 1)`;

// try {
// 	connected.query('BEGIN');
// 	await connected.query(insert);
// 	await connected.query('COMMIT');
// }
// catch (err) {
// 	await connected.query('ROLLBACK');
// 	console.error('Warning', err);
// }
// finally {
// 	await connected.end();
// 	console.log("ok");
// }

const consult = await connected.query('SELECT * FROM data.done');
await connected.end();
const {crates} = consult.rows[0];
console.log(crates);

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
