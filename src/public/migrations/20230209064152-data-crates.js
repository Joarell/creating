'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('data_solved', {
			reference_id: {
				type: Sequelize.INTEGER,
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
			total_cub: {
				type: Sequelize.DECIMAL(7,3),
				allowNull: false
			},
			user_name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { 
					model: {
						tableName:'users',
						schema: 'craters'
					},
				key: 'id' },
				allowNull: false
			},
			update_satate: {
				field: 'created_at',
				type: Sequelize.DATEONLY,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('data_solved');
	}
};
