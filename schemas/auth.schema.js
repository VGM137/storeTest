const Joi = require('joi');

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  token: Joi.string().required()
});

module.exports = { updatePasswordSchema };