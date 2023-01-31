import { connectDB } from "./db.settings.js";


const conneted = connectDB('5432', 'jev', 'EnterNight90');
const {rows} = await conneted.query('SELECT * FROM data.solved');
console.log('Content', rows[0]);
await conneted.end();


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
