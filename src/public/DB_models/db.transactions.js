// ╭────────────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────────────╮ │
// │ │ INFO: Here you will find the database layer functions: │ │
// │ │                   retriveDataUsers()                   │ │
// │ │                 retriveDataEstimates()                 │ │
// │ │                      addNewUser()                      │ │
// │ │                   addUserNewToken()                    │ │
// │ │                 addResultToDataBase()                  │ │
// │ │                      updateData()                      │ │
// │ │                     delEstimate()                      │ │
// │ ╰────────────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────────────╯


const pool = require('./db.settings');
const encription = require('../auth/encriptation.module.js');


async function retriveDataUsers() {
	const client  = await pool.connect();
	const { rows } = await client.query('SELECT * FROM craters.users');
	client.release();
	return (rows);
}


async function retriveDataEstimates() {
	const client = await pool.connect();
	const { rows } = await pool.query('SELECT * FROM data_solved');
	client.release();
	return (rows);
}


async function addNewUser (user) {
	const {
		name, email, lastName, passFrase, birthday, accessToken, refreshToken
	} = user;
	const criptPass = await encription.passEncriptProcedure (passFrase);

	if (criptPass === 500)
		return (criptPass);
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const userData = `
			INSERT INTO craters.users 
			(name, last_name, birth_date, email, pass_frase, auth_token,
			refresh_token) VALUES
			('${name}', '${lastName}', '${birthday}', '${email}',
			'${criptPass}', '${accessToken}', '${refreshToken}')
		`;
		await pool.query(userData);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.error(`ALERT, ${err}`);
		await pool.query('ROLLBACK');
	}
	finally {
		client.release();
	}
}


async function addUserNewToken (newToken) {
	const { name, token } = newToken;
	const dbUser = await retriveDataUsers();
	const checkUser = dbUser.find(user => user.name === name);

	if(!checkUser)
		return (404);
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const content = `INSERT INTO users (auth_token)
		VALUES ('${token}')`;
		await pool.query(content);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.err(`Beware ${err}`);
		return (500);
	}
	finally {
		client.release();
	};
};


async function addResultToDataBase(estimate) {
	const { reference, user_name, user_id } = estimate;
	const list = JSON.stringify({ "list": estimate.list }, null, "");
	const crates = JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const content = ` INSERT INTO data_solved 
			(reference_id, works, crates, user_name, user_id, update_state)
			VALUES
			('${reference}', '${list}', '${crates}', '${user_name}', ${user_id},
			'${dataUTC}')
		`;
		await pool.query(content);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.error("ALERT", err);
		await pool.query('ROLLBACK');
		throw err;
	}
	finally {
		client.release();
	};
}


async function updateData (content) {
	const { reference, user_name } = content;
	const list = JSON.stringify({ "list": content.works }, null, "");
	const crates = JSON.stringify({ "crates": content.crates }, null, "");
	const dataUTC = new Date(Date.now()).toLocaleString();
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
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
	finally {
		client.release();
	};
};


async function delEstimate (ref) {
	const command = `DELETE FROM data_solved WHERE reference_id = '${ref}'`;
	const client = await pool.connect();

	await client.query(command);
	client.release();
}

module.exports = {
	addNewUser,
	retriveDataUsers,
	retriveDataEstimates,
	addResultToDataBase,
	delEstimate,
	updateData,
	addUserNewToken
};
