const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(0).max(150);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const price_min = Joi.number().integer().min(0);
const price_max = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
  name: name.required(),
  description,
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().min(0),
    then: Joi.required()
  }),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
