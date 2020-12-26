const Joi = require('@hapi/joi');     // allows us to validate data

//Register Validation

const regValidateSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).alphanum().required(),
  lastName: Joi.string().min(2).max(50).alphanum().required(),
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).max(100).required()
});

//Login Validation
const logValidateSchema = Joi.object({
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().required()
});

//Subscribe Validation
const subValidateSchema = Joi.object({
  email: Joi.string().min(6).max(100).required().email()
});

module.exports = { 
  regValidateSchema,
  logValidateSchema,
  subValidateSchema
}