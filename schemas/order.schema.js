const Joi = require('joi');

const id = Joi.number().integer();
const totalPrice = Joi.number().min(0);
const userId = Joi.number().integer();
const status = Joi.string().valid('pending', 'completed', 'canceled');
const deliveryAddress = Joi.string().min(3).max(100);
const deliveryType = Joi.string().valid('shipping', 'pickup', 'pickupPoint');
const createdAt = Joi.date();
const orderId = Joi.number().integer().min(1);
const productId = Joi.number().integer().min(1);
const quantity = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  totalPrice: totalPrice.required(),
  userId: userId.required(),
  status: status,
  deliveryAddress: deliveryAddress,
  deliveryType: deliveryType,
  createdAt: createdAt,
});

const addItemsSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required(),
});

module.exports = { getOrderSchema, createOrderSchema, addItemsSchema };