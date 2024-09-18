const joi = require('joi')

const forgotPasswordValidation = joi.object({
    email: joi.string().email({minDomainSegments:2}).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
})
module.exports = { forgotPasswordValidation };