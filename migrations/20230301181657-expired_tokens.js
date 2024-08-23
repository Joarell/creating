'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.showAllSchemas({ logging: false })
			.then(async (data) => {
				if(!data.includes('craters'))
					await queryInterface.createSchema('craters');
			});
		await queryInterface.createTable('expired_tokens', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
			},
			session: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			user_id: {
				type: Sequelize.STRING(20),
				references: {
					model: {
						tableName: 'users',
						schema: 'craters'
					},
					key: 'id'
				},
				allowNull: false
			},
			auth_token: {
				type: Sequelize.STRING,
				allowNull: false
			},
			refresh_token: {
				type: Sequelize.STRING,
				allowNull: false
			},
			expire_date: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			}
		},
		{
			schema: 'craters'
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('expired_tokens');
		await queryInterface.dropSchema('craters');
	}
};
