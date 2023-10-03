// ╭──────────────────────────────────────────────────────────────╮
// │ ╭──────────────────────────────────────────────────────────╮ │
// │ │ INFO: Here is the data base token transaction functions: │ │
// │ │                 storeSuspiciousTokens()                  │ │
// │ │                retrieveSuspiciousTokens()                │ │
// │ │                   retrieveOldTokens()                    │ │
// │ ╰──────────────────────────────────────────────────────────╯ │
// ╰──────────────────────────────────────────────────────────────╯


const pool	= require('./db.settings');


async function storeSuspiciousTokens (data) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const content = `
			INSERT INTO
				craters.suspicious_tokens (
				user_id, auto_token, refresh_token, session
				)
			VALUES (
				'${data.id}',
				'${data.authToken}',
				'${data.refToken}',
				'${data.session}'
			)`;
		await client.query(content);
		await client.query('COMMIT');
		return (201);
	}
	catch ( err ) {
		await client.query ('ROLLBACK');
		console.error(`WARNING: ${err}`);
		return (500);
	}
	finally {
		client.release();
	};
};


async function retrieveSuspiciousTokens () {
	const client = await pool.connect();

	try {
		const { rows } = await client.query(
			`SELECT
				*
			FROM
				craters.suspicious_tokens
			`
		);
		return (rows);
	}
	catch (err) {
		console.error(`WARNING: ${err}`);
		await client.query ('ROLLBACK');
		return ({500: `${err}`});
	}
	finally {
		client.release();
	};
};


async function retrieveOldTokens () {
	const client = await pool.connect();

	try {
		const { rows } = await client.query(
			`SELECT
				*
			FROM
				craters.expired_tokens
			`
		);
		return (rows);
	}
	catch (err) {
		console.error(`WARNING: ${err}`);
		await client.query ('ROLLBACK');
		return ({500: `${err}`});
	}
	finally {
		client.release();
	};
};

module.exports = {
	storeSuspiciousTokens,
	retrieveSuspiciousTokens,
	retrieveOldTokens
};
