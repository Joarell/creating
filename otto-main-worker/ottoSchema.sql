CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY NOT NULL,
	name VARCHAR(30) NOT NULL,
	companyName VARCHAR(20) NOT NULL,
	birth_date DATE NOT NULL,
	email VARCHAR(20) NOT NULL,
	pass_frase VARCHAR(100) NOT NULL,
	auth_token TEXT NOT NULL,
	refresh_token TEXT NOT NULL,
	created DATE NOT NULL,
	active_session VARCHAR(20),
	grant_access VARCHAR(10)
);
