const joi = require('joi')

const loginvalidation = joi.object({
    email: joi.string().email({minDomainSegments:2}).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().required().messages({
        'string.empty': 'Please enter a password',
        'any.required': 'Password is required'
    }),
})

module.exports = { loginvalidation };