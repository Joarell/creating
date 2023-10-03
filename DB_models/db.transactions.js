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


const pool			=		require('./db.settings');
const encryption	=		require('../auth/encriptation.module.js');
const { randomBytes } =		require('crypto');


async function retriveDataUsers(user, target) {
	console.log('GET users:', user);
	const client	= await pool.connect();

	console.log('TG', target);
	try {
		if (target !== undefined && target === 'auth') {
			const { rows }	= await client.query(`
				SELECT
					*
				FROM
					craters.users
				WHERE
					id = '${user}'
			`);
			console.log(rows);
			return (rows);
		}
		const { rows }	= await client.query(`
			SELECT
				*
			FROM
				craters.users
			WHERE
				name = '${user}'
		`);
		return (rows);
	}
	catch (err) {
		console.error(`ALERT, ${err}`);
		await pool.query('ROLLBACK');
	}
	finally {
		client.release();
	};
}


async function retriveDataEstimates(doc) {
	const client	= await pool.connect();

	try {
		const { rows }	= await pool.query(`
			SELECT
				*
			FROM
				data_solved
			WHERE
				reference_id = '${doc}'
		`);
		return (rows);
	}
	catch (err) {
		console.error(`ALERT, ${err}`);
		await pool.query('ROLLBACK');
	}
	finally {
		client.release();
	};
}


async function addNewUser (user) {
	const {
		user_name, email, lastName, passFrase, birthday, accessToken, refreshToken
	} = user;
	const criptPass =	encryption.passEncriptProcedure (passFrase);
	const client =		await pool.connect();
	const id =			randomBytes(10).toString('hex');

	if (criptPass === 500 || criptPass === undefined) {
		client.release();
		return (500);
	}
	try {
		await client.query('BEGIN');
		const userData = `
			INSERT INTO craters.users 
			(id, name, last_name, birth_date, email, pass_frase, auth_token,
			refresh_token) VALUES
			('${id}', '${user_name}', '${lastName}', '${birthday}', '${email}',
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


async function addResultToDataBase(estimate, session) {
	const { reference, user_name, user_id } = estimate;
	const list		= JSON.stringify({ "list": estimate.list }, null, "");
	const crates	= JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC	= new Date(Date.now()).toLocaleString();
	const client	= await pool.connect();

	try {
		await client.query('BEGIN');
		const content = ` INSERT INTO data_solved
			(reference_id, works, crates, user_name, session, user_id, update_state)
			VALUES ('${reference}', '${list}', '${crates}', '${user_name}',
			'${session}', '${user_id}', '${dataUTC}'
			)`;
		await pool.query(content);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.error("ALERT DUPLICATE DATA:", err);
		await pool.query('ROLLBACK');
		return (409);
	}
	finally {
		client.release();
	};
}


async function updateData (content, session) {
	console.log('UPDATE', content);
	const { reference, user_name } = content;
	const list		= JSON.stringify({ "list": content.list }, null, "");
	const crates	= JSON.stringify({ "crates": content.crates }, null, "");
	const dataUTC	= new Date(Date.now()).toLocaleString();
	const client	= await pool.connect();

	try {
		await client.query('BEGIN');
		const up = `UPDATE data_solved SET
			works = '${list}',
			crates = '${crates}',
			update_state = '${dataUTC}',
			updated_by = '${user_name}',
			session = '${session}'
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
	const command	= `DELETE FROM data_solved WHERE reference_id = '${ref}'`;
	const client	= await pool.connect();

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
};
