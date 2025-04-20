const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: ['customer']
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }, 'items']
    });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }]
    });
    console.log('Orders;',orders);
    return orders;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  async addItem(data) {
    const order = await models.Order.findByPk(data.orderId);
    if (!order) {
      throw boom.notFound('Order does not exist');
    }
    const product = await models.Product.findByPk(data.productId);
    if (!product) {
      throw boom.notFound('Product does not exist');
    }
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

}

module.exports = OrderService;
