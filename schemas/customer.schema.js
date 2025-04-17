const e = require('express');
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().min(10).max(15);
const userId = Joi.number().integer();
const username = Joi.string().alphanum().min(3).max(30);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phoneNumber: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    username: username.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  phone: phone,
  userId: userId,
});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

const getCustomerByEmailSchema = Joi.object({
  email: email.required(),
});

const getCustomerByPhoneSchema = Joi.object({
  phone: phone.required(),
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema,
  getCustomerByEmailSchema,
  getCustomerByPhoneSchema,
};

