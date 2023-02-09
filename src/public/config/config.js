require('dotenv').config();


module.exports = {
	development: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		port: process.env.PORT,
		host: process.env.PGHOST,
		dialect: process.env.DB_DIALECT,
		logging: true,
		define: {
			charset: 'utf8',
			dialectOptions: {
				collate: 'utf8_general_ci'
			}
		},
		timezone: 'America/Sao_Paulo'
	},
	test: {
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		port: process.env.PORT,
		host: process.env.PGHOST,
		dialect: process.env.DB_DIALECT,
		logging: true,
		define: {
			charset: "utf8",
			dialectOptions: {
				collate: "utf8_general_ci"
			}
		},
		dialectOptions: { useUTC: false },
		timezone: 'America/Sao_Paulo'
	},
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
		timezone: 'America/Sao_Paulo'
	},
		pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}
