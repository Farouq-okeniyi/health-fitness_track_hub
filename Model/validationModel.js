const joi = require('joi')

// validating using joi

const userValidationSchema = joi.object({
    fullName: joi.string().min(5).max(20).required().messages({
        'string.empty': 'Please enter your full name',
        'string.min': 'Full Name should be more than 5 characters',
        'string.max': 'Full name should be less tham 20 characters',
        'any.required': 'Full name is required'
    }),
    userName: joi.string().min(5).max(20).required().messages({
        'string.empty': 'Please enter your User name',
        'string.min': 'User Name should be more than 5 characters',
        'string.max': 'User name should be less tham 20 characters',
        'any.required': 'User name is required'
    }),
    phoneNumber: joi.number().integer().min(1000000000).max(99999999999).required().messages({
        'number.empty':'please Input a valid phone number',
          'any.required': 'Phone number is required'
    }),
    gender: joi.string().optional(), // Gender is optional
    email: joi.string().email({minDomainSegments:2}).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().required().messages({
        'string.empty': 'Please enter a password',
        'any.required': 'Password is required'
    }),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Please confirm your password'
    })
})

module.exports = { userValidationSchema };