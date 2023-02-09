REVOKE ALL PRIVILEGES ON ... FROM user_gp;
GRANT SELECT, INSERT, UPDATE
ON crater.solved, crater.crates, crater.arrengement TO user_gp;
GRANT USAGE ON SCHEMA data TO user_gp;
ALTER SCHEMA data OWNER TO otto_infinity;


CREATE ROLE user_gp INHERIT;
CREATE USER jev WITH LOGIN ENCRYPTED PASSWORD 'EnterNight90' IN GROUP user_gp;


CREATE SCHEMA IF NOT EXISTS data AUTHORIZATION user_gp;

CREATE TABLE IF NOT EXISTS crater.users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	birth_date DATE NOT NULL,
	email VARCHAR(200) NOT NULL,
	pass_frase TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS data.done (
	reference VARCHAR(20) PRIMARY KEY,
	crates JSONB NOT NULL,
	works JSONB NOT NULL,
	user_name VARCHAR(200) NOT NULL,
	user_id INT NOT NULL,
	update_state TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (user_id) references crater.users (id)
);


/* CREATE TABLE IF NOT EXISTS data.solved( */
/* 	reference_id VARCHAR(20), */
/* 	works_qt INT NOT NULL, */
/* 	crates_qt INT NOT NULL, */
/* 	total_cub NUMERIC(7,3) NOT NULL, */
/* 	user_name VARCHAR(200) NOT NULL, */
/* 	user_id INT NOT NULL, */
/* 	creation TIMESTAMP DEFAULT NOW(), */
/* 	PRIMARY KEY(reference_id), */
/* 	FOREIGN KEY (user_id) REFERENCES crater.users (id) */
/* ); */
/*  */
/*  */
/* CREATE TABLE IF NOT EXISTS data.crates ( */
/* 	estimate_id VARCHAR(20), */
/* 	crate_numb INT NOT NULL, */
/* 	lenght_x DECIMAL(6,3) NOT NULL, */
/* 	depth_z DECIMAL(6,3) NOT NULL, */
/* 	height_y DECIMAL(6,3) NOT NULL, */
/* 	unit VARCHAR(3) DEFAULT 'cm', */
/* 	user_name VARCHAR(200) NOT NULL, */
/* 	user_id INT NOT NULL, */
/* 	update_state TIMESTAMP DEFAULT NOW(), */
/* 	FOREIGN KEY (estimate_id) REFERENCES data.solved (reference_id) ON DELETE CASCADE, */
/* 	FOREIGN KEY (user_id) REFERENCES crater.users (id) */
/* ); */
/*  */
/*  */
/* CREATE TABLE IF NOT EXISTS data.arrengement ( */
/* 	estimate VARCHAR(20), */
/* 	crate_id INT, */
/* 	work_code VARCHAR(20) NOT NULL, */
/* 	lenght DECIMAL(6,3) NOT NULL, */
/* 	depth DECIMAL(6,3) NOT NULl, */
/* 	height DECIMAL(6,3) NOT NULL, */
/* 	spining VARCHAR(3) DEFAULT 'NO', */
/* 	user_name VARCHAR(200) NOT NULL, */
/* 	user_id INT NOT NULL, */
/* 	update_state TIMESTAMP DEFAULT NOW(), */
/* 	FOREIGN KEY (estimate) references data.solved (reference_id) ON DELETE cascade, */
/* 	FOREIGN KEY (user_id) references crater.users (id), */
/* 	PRIMARY KEY(estimate) */
/* ); */


CREATE TABLE monitoring_table (

);


CREATE POLICY user_actions (

);


INSERT INTO data.done( reference, crates, works, user_name, user_id)
VALUES (
'PED-TEST1',
'{
	"crates":[
		["Final", 223, 46, 228, 2.338],
		["Final", 211, 113, 118, 2.813]
	]
}',
'{
	"list":[
		{"code":"0901", "x":90, "z": 90, "y":100},
		{"code":"0902", "x":90, "z": 90, "y":110},
		{"code":"0903", "x":90, "z": 90, "y":120},
		{"code":"0904", "x":90, "z": 90, "y":130},
		{"code":"0905", "x":90, "z": 90, "y":140},
		{"code":"0906", "x":90, "z": 90, "y":150},
		{"code":"0907", "x":90, "z": 90, "y":160},
		{"code":"0908", "x":90, "z": 90, "y":170}
	]
}',
'JEV',
1);


INSERT INTO crater.users (
	first_name,
	last_name,
	birth_date,
	email,
	pass_frase
) VALUES ('Jeve', 'Chaga', DATE '1990-08-12', 'jeve@test.com', 'tested');

INSERT INTO crater.users (
	first_name,
	last_name,
	birth_date,
	email,
	pass_frase
) VALUES ('Jeve', 'Chaga', DATE '1990-08-12', 'jeve@test.com', 'tested');


INSERT INTO data.solved(
	reference_id,
	works_qt,
	crates_qt,
	total_cub,
	user_name,
	user_id,
	creation
) VALUES ('PED-TEST', '12', '3', '10.123', 'JEV', 1, DATE '2023-01-23');


INSERT INTO data.crates (
	estimate_id,
	crate_numb,
	lenght_x,
	depth_z,
	height_y,
	unit,
	user_name,
	user_id,
	update_state
) VALUES ('PED-TEST', 2, 100.0, 10.0, 100.0, 'in', 'JEV', 1, NOW());


