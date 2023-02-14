const pool = require('./db.settings');
require('dotenv').config();


async function retriveDataUsers() {
	await pool.connect();
	const { rows } = await pool.query('SELECT * FROM craters.users');
	return (rows[0]);
}


async function retriveDataEstimates() {
	await pool.connect();
	const { rows } = await pool.query('SELECT * FROM data_solved');
	return (rows);
}


async function updateData (content) {
	const { reference, user_name } = content;
	const works = JSON.stringify({ "list": content.works }, null, "");
	const crates = JSON.stringify({ "crates": content.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();

	await pool.connect();
	try {
		await pool.query('BEGIN');
		const up = `UPDATE data_solved SET 
			works = '${list}',
			crates = '${crates}',
			update_state = '${dataUTC}',
			updated_by = '${user_name}'
			WHERE reference_id = '${reference}'`;
		await pool.query(up);
		await pool.query('COMMIT');
	}
	catch (err) {
		console.error("ATTENTION", err);
		await pool.query('ROLLBACK');
		throw err;
	}
};


async function addResultToDataBase(estimate) {
	const { reference, user_name, user_id } = estimate;
	const list = JSON.stringify({ "list": estimate.list }, null, "");
	const crates = JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();

	await pool.connect();
	try {
		await pool.query('BEGIN');
		const content = `
			INSERT INTO data_solved 
			(reference_id, works, crates, user_name, user_id, update_state)
			VALUES
			('${reference}', '${list}', '${crates}', '${user_name}', ${user_id},
			'${dataUTC}')
		`;
		await pool.query(content);
		await pool.query('COMMIT');
	}
	catch (err) {
		console.error("ALERT", err);
		await pool.query('ROLLBACK');
		throw err;
	}
}


async function delEstimate (ref) {
	const command = `DELETE FROM data_solved WHERE reference_id = '${ref}'`;
	pool.connect();
	pool.query(command);
	pool.end();
}

module.exports = {
	retriveDataUsers,
	retriveDataEstimates,
	addResultToDataBase,
	delEstimate,
	updateData
};
