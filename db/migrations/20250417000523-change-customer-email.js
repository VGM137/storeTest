'use strict';

const { date } = require('joi');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');
const {DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'email');
  },
  
  async down (queryInterface) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
