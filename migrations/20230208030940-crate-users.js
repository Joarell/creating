'use strict';


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
				type: Sequelize.STRING(20),
				allowNull: false,
				primaryKey: true,
				autoIncrement: false,
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
				type: Sequelize.STRING(100),
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
			created: {
				field: 'created_at',
				type: Sequelize.DATEONLY,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			},
			active_session: {
				type: Sequelize.STRING,
				allowNull: true,
			}
		},
		{
			schema: 'craters'
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
		await queryInterface.dropSchema('craters');
	}
};
