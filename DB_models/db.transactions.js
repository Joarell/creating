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


const pool =				require('./db.settings');
const encryption =			require('../auth/encryptation.module.js');
const { randomBytes } =		require('crypto');
const DFRedis =				require('ioredis');
const cache =				new DFRedis(process.env.CACHE_ACCESS);


async function retrieveDataUsers(user, target) {
	console.log('GET users:', user, 'and', target);
	const client = await pool.connect();

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


async function retrieveDataEstimates(doc, cookie) {
	const client =	await pool.connect();
	const table =	await cache.get(cookie.name);

	console.log(`Searching to : ${table}`)
	try {
		const { rows }	= await pool.query(`
			SELECT
				*
			FROM
				"${table}"
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
		company,
		user_name,
		email,
		lastName,
		passFrase,
		birthday,
		accessToken,
		refreshToken,
		access
	} = user;
	const cryptPass =	encryption.passEncryptProcedure (passFrase);
	const client =		await pool.connect();
	const id =			randomBytes(10).toString('hex');

	try {
		await client.query('BEGIN');
		const userData = `
			INSERT INTO craters.users
			(id, company, name, last_name, birth_date, email, pass_frase, auth_token,
			refresh_token, grant_access) VALUES
			('${id}', '${company}', '${user_name}', '${lastName}', '${birthday}', '${email}',
			'${cryptPass}', '${accessToken}', '${refreshToken}', '${access}')
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
	const { reference } = estimate;
	const list =	JSON.stringify({ "list": estimate.list }, null, "");
	const crates =	JSON.stringify({ "crates": estimate.crates }, null, "");
	const dataUTC =	new Date(Date.now()).toLocaleString();
	const client =	await pool.connect();
	const table =	await cache.get(userData.name);

	try {
		await client.query('BEGIN');
		const content = ` INSERT INTO "${table}"
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


async function updateData (content, session, cookie) {
	const { reference } =	content;
	const list =			JSON.stringify({ "list": content.list }, null, "");
	const crates =			JSON.stringify({ "crates": content.crates }, null, "");
	const client =			await pool.connect();
	const table =			await cache.get(cookie.name);

	console.log(`UPDATE TO: ${table}`)
	try {
		const { name }	= await retrieveSessionNumber(session);
		await client.query('BEGIN');
		const up = `UPDATE "${table}" SET
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


async function delEstimate (ref, cookie) {
	const table =	await cache.get(cookie.name);
	const command =	`DELETE FROM "${table}" WHERE reference_id = '${ref}'`;
	const client =	await pool.connect();

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
