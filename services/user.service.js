const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool.js');
const { models } = require('../libs/sequelize.js');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error('Unexpected error on idle client', err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const query = await models.User.findAll({
      include: ['customer']
    });
    return query;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    const rta = await user.destroy();
    return rta
  }
}

module.exports = UserService;
