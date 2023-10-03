'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('data_solved', {
			reference_id: {
				type: Sequelize.STRING(30),
				allowNull: false,
				primaryKey: true
			},
			works: {
				type: Sequelize.JSONB,
				allowNull: false
			},
			crates: {
				type: Sequelize.JSONB,
				allowNull: false
			},
			user_name: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			user_id: {
				type: Sequelize.STRING(20),
				references: { 
					model: {
						tableName:'users',
						schema: 'craters'
					},
					key: 'id'
				},
				allowNull: false
			},
			session: {
				type: Sequelize.STRING.BINARY,
				allowNull: false,
			},
			update_state: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			updated_by: {
				type: Sequelize.STRING(50),
				allowNull: true,
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('data_solved');
	}
};
