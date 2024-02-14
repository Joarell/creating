'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('users', {
		// 	tableName: 'users', schema:'craters'
		// },
		// {
			user_name: 'Jev',
			lastName: 'Souza',
			email: 'otto@test.com',
			passFrase: 'testing',
			birthday: '1990-08-12
		}, {});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('users', {
			// tableName: 'users',
			// schema: 'craters'
		}, null, {});
	}
};
