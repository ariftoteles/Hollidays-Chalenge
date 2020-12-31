'use strict';
const data = [
  {
    identityNumber: "1234567890556677",
    fullName: "John Doe",
    address: "Jakarta",
    birthDate: "01-02-2000",
    gender: "male",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    identityNumber: "0987654321112233",
    fullName: "Angela Michael",
    address: "Bandung",
    birthDate: "01-03-2000",
    gender: "female",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    identityNumber: "5432167890009988",
    fullName: "James David",
    address: "Tangerang",
    birthDate: "01-04-2000",
    gender: "male",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {})
  }
};
