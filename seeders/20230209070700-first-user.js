'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert({
			tableName: 'users',
			schema: 'craters'
		}, [{
			name: 'Jev',
			lastName: 'Souza',
			birthday: '1990-08-12',
			email: 'otto@test.com',
			passFrase: 'testing'
		}]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete({
			tableName: 'users',
			schema: 'craters'
		}, null, {});
	}
};
