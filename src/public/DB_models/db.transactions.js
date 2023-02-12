const pool = require('./db.settings');
require('dotenv').config();


async function retriveDataUsers() {
	pool.connect();
	const { rows } = await pool.query('SELECT * FROM craters.users');
	pool.end();
	return (rows[0]);
}


async function retriveDataEstimates() {
	pool.connect();
	const { rows } = await pool.query('SELECT * FROM data_solved');
	pool.end();
	return (rows);
}


async function updateData (content) {
	const { reference, total_cub, user_name } = content;
	const works = JSON.stringify({ "list": content.works }, null, "");
	const crates = JSON.stringify({ "crates": content.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();

	pool.connect();
	try {
		await pool.query('BEGIN');
		const up = `UPDATE data_solved SET 
			works = '${works}',
			crates = '${crates}',
			total_cub = ${total_cub},
			update_state = '${dataUTC}',
			updated_by = '${user_name}'
			WHERE reference_id = '${reference}';
		`;
		await pool.query(up);
		await pool.query('COMMIT');
	}
	catch (err) {
		console.error("ATTENTION", err);
		await pool.query('ROLLBACK');
		throw err;
	}
};


// TODO: check with real data from the app
async function addResultToDataBase(estimate) {
	const { reference, total_cub, user_name, user_id } = estimate;
	const works = JSON.stringify({ "list": estimate.works }, null, "");
	const crates = JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();

	pool.connect();
	try {
		await pool.query('BEGIN');
		const content = `INSERT INTO data_solved (reference_id, works, crates,
			total_cub, user_name, user_id, update_state) VALUES ('${reference}',
			'${works}', '${crates}', ${total_cub}, '${user_name}', ${user_id},
			'${dataUTC}'
		)`;
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
