const boom = require('@hapi/boom');
const bycrypt = require('bcrypt');
const { models } = require('../libs/sequelize.js');

const UserService = require('./user.service.js');

class CustomerService {
  constructor() {
    this.userService = new UserService();
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
    const hash = await bycrypt.hash(data.user.password, 10);
    const existingUser = await this.userService.findByEmail(data.user.email);
    let newData = {}
    if (existingUser) {
      console.log('User already exists:', existingUser);
      newData = data;
      delete newData.user;
      newData = {
        ...newData,
        userId: existingUser.id,
      }
      console.log('New data:', newData);
      const newCustomer = await models.Customer.create(newData);
      console.log('New customer:', newCustomer);
      return newCustomer
    } else {
      newData = {
        ...data,
        user: {
          ...data.user,
          password: hash
        }
      };
      const newCustomer = await models.Customer.create(newData, {
        include: ['user']
      });
      delete newCustomer.dataValues.user.dataValues.password;
      return newCustomer;
    }


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