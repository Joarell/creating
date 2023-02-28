'use strict';
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.showAllSchemas({ logging: true })
			.then(async (data) => {
				if (!data.includes('craters'))
					await queryInterface.createSchema('craters');
			});
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				timestamps: true,
			},
			name: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			birth_date: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			pass_frase: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			auth_token: {
				type: Sequelize.STRING,
				allowNull: true
			},
			refresh_token: {
				type: Sequelize.STRING,
				allowNull: false
			},
			added: {
				field: 'created_at',
				type: Sequelize.DATEONLY,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			}
		},
		{
			schema: 'craters'
		},
		{
			instanceMethods: {
				generateHash: (pass) => {
					const salt = bcrypt.genSaltSync(10);
					return (bcrypt.hashSync(pass, bcrypt. salt, null));
				},
				validPassword: (pass) => {
						return (bcrypt.compareSync(pass, this.pass));
				}
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
		await queryInterface.dropSchema('craters');
	}
};
