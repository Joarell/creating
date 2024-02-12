require('dotenv').config();


module.exports = {
	development: {
		username: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB,
		port: process.env.DB_PORT,
		host: process.env.PG_HOST,
		dialect: process.env.DB_DIALECT,
		logging: true,
		define : {
			charset: "utf8",
			dialectOptions: {
				useUTC: false,
				timezone: "America/Sao_Paulo"
			}

		},
		// dialectOptions: {
		// 	timezone: "America/Sao_Paulo",
		// },
		timezone: "-03:00"
	},
	// test: {
	// 	username: process.env.PGUSER,
	// 	password: process.env.PGPASSWORD,
	// 	database: process.env.PGDATABASE,
	// 	port: process.env.PORT,
	// 	host: process.env.PGHOST,
	// 	dialect: process.env.DB_DIALECT,
	// 	logging: true,
	// 	define: {
	// 		charset: "utf8",
	// 		dialectOptions: {
	// 			collate: "utf8_general_ci"
	// 		}
	// 	},
	// 	dialectOptions: { useUTC: false },
	// 	timezone: '-03:00'
	// },
	production: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		port: process.env.PORT,
		host: process.env.PGHOST,
		dialect: process.env.DB_DIALECT,
		logging: false,
		define: {
			charset: "utf8",
			dialectOptions: {
				collate: "utf8_general_ci"
			}
		},
		dialectOptions: { useUTC: false },
		timezone: '-03:00'
	},
		pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}
