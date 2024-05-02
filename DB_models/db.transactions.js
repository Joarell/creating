// ╭────────────────────────────────────────────────────────────╮
// │ ╭────────────────────────────────────────────────────────╮ │
// │ │ INFO: Here you will find the database layer functions: │ │
// │ │                   retrieveDataUsers()                  │ │
// │ │                 retrieveDataEstimates()                │ │
// │ │                      addNewUser()                      │ │
// │ │                   addUserNewToken()                    │ │
// │ │                 addResultToDataBase()                  │ │
// │ │                      updateData()                      │ │
// │ │                     delEstimate()                      │ │
// │ ╰────────────────────────────────────────────────────────╯ │
// ╰────────────────────────────────────────────────────────────╯


const pool			=		require('./db.settings');
const encryption	=		require('../auth/encryptation.module.js');
const { randomBytes } =		require('crypto');


async function retrieveDataUsers(user, target) {
	console.log('GET users:', user, 'and', target);
	const client	= await pool.connect();

	console.log('TG', target);
	try {
		if (target === 'auth') {
			const { rows }	= await client.query(`
				SELECT
					*
				FROM
					craters.users
				WHERE
					id = '${user}'
			`);
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


async function retrieveDataEstimates(doc) {
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
	const cryptPass =	encryption.passEncryptProcedure (passFrase);
	const client =		await pool.connect();
	const id =			randomBytes(10).toString('hex');

	// if (cryptPass === 500 || criptPass === undefined) {
	// 	client.release();
	// 	return (500);
	// }
	try {
		await client.query('BEGIN');
		const userData = `
			INSERT INTO craters.users
			(id, name, last_name, birth_date, email, pass_frase, auth_token,
			refresh_token) VALUES
			('${id}', '${user_name}', '${lastName}', '${birthday}', '${email}',
			'${cryptPass}', '${accessToken}', '${refreshToken}')
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


async function addResultToDataBase(estimate, userData) {
	console.log('RESULT DATA:', estimate);
	const { reference } = estimate;
	const list		= JSON.stringify({ "list": estimate.list }, null, "");
	const crates	= JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC	= new Date(Date.now()).toLocaleString();
	const client	= await pool.connect();

	try {
		await client.query('BEGIN');
		const content = ` INSERT INTO data_solved
			(reference_id, works, crates, user_name, user_id, session, update_state)
			VALUES ('${reference}', '${list}', '${crates}', '${userData.name}',
			'${userData.id}', '${userData.session}', '${dataUTC}')`;
		await pool.query(content);
		await pool.query('COMMIT');
		return (201);
	}
	catch (err) {
		console.error("DATA ERROR:", err);
		await pool.query('ROLLBACK');
		return (409);
	}
	finally {
		client.release();
	};
}


async function retrieveSessionNumber(num) {
	const client	= await pool.connect();

	try {
		const { rows }	= await pool.query(`
			SELECT
				name
			FROM
				craters.users
			WHERE
				active_session = '${num}'
		`);
		return (rows[0]);
	}
	catch (err) {
		console.error(`ALERT, ${err}`);
		await pool.query('ROLLBACK');
	}
	finally {
		client.release();
	};
};


async function updateData (content, session) {
	console.log('UPDATE DATA', content);
	const { reference } = content;
	const list			= JSON.stringify({ "list": content.list }, null, "");
	const crates		= JSON.stringify({ "crates": content.crates }, null, "");
	const client		= await pool.connect();

	try {
		const { name }	= await retrieveSessionNumber(session);
		await client.query('BEGIN');
		const up = `UPDATE data_solved SET
			works = '${list}',
			crates = '${crates}',
			updated_by = '${name}',
			update_state = '${new Date().toLocaleString()}',
			session = '${session}'
			WHERE reference_id = '${reference}'`;
		await pool.query(up);
		await pool.query('COMMIT');
	}
	catch (err) {
		console.error("ATTENTION", err);
		await pool.query('ROLLBACK');
		return (500);
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
	retrieveDataUsers,
	retrieveDataEstimates,
	addResultToDataBase,
	delEstimate,
	updateData,
};
