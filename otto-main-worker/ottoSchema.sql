CREATE TABLE IF NOT EXISTS users (
	id TEXT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	company_name TEXT NOT NULL,
	birth_date TEXT NOT NULL,
	email TEXT NOT NULL,
	pass_phrase TEXT NOT NULL,
	auth_token TEXT NOT NULL,
	refresh_token TEXT NOT NULL,
	created TEXT NOT NULL,
	active_session TEXT,
	grant_access TEXT
);
