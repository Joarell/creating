CREATE TABLE IF NOT EXISTS solved_list(
	reference_id VARCHAR(20),
	works_qt INT NOT NULL,
	crates_qt INT NOT NULL,
	total_cub NUMERIC(7,3) NOT NULL,
	user_name VARCHAR(200) NOT NULL,
	creation TIMESTAMP NOT NULL,
	PRIMARY KEY(reference_id),
);


INSERT INTO solved_list(
	reference_id,
	works_qt,
	crates_qt,
	total_cub,
	user_name,
	creation
) VALUES ('PED-TEST', '12', '3', '10.123', 'JEV', DATE '2023-01-23');


CREATE TABLE crates (
	estimate_id VARCHAR(20),
	crate_numb INT NOT NULL,
	lenght DECIMAL(3,3) NOT NULL,
	depth DECIMAL(3,3) NOT NULL,
	height DECIMAL(3,3) NOT NULL,
	unit VARCHAR(3) DEFAULT 'cm',
	FOREIGN KEY (estimate_id) REFERENCES solved_list (reference_id) ON DELETE CASCADE),
);


CREATE TABLE arrengement (
	estimate VARCHAR(20),
	crate_id INT,
	work_code VARCHAR(20) UNIQUE,
	FOREIGN KEY (crate_id) REFERENCES crates(crate_numb) ON DELETE CASCADE),
	FOREIGN KEY (estimate) REFERENCES solved_list(reference_id) ON DELETE CASCADE),
);


CREATE TABLE users (
	id INT AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	birth_data (DATA) NOT NULL,
	pass_frase VARCHAR(100) NOT NULL,
	PRIMARY key (id),
);
