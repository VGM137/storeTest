const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize.js');

class CustomerService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error('Unexpected error on idle client', err));
  }
 
  async find() {
    const query = await models.Customer.findAll({
      include: ['user']
    });
    return query;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta
  }
  async delete(id) {
    const customer = await this.findOne(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    const rta = await customer.destroy();
    return rta
  }
  async findByEmail(email) {
    const customer = await models.Customer.findOne({
      where: { email }
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async findByPhone(phone) {
    const customer = await models.Customer.findOne({
      where: { phone }
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
};

module.exports = CustomerService;