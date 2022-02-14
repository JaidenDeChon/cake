const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(10).max(10),
    message: Joi.string().min(10).max(9999),
    okToText: Joi.bool(),
    okToCall: Joi.bool()
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {

    const result = schema.validate(message);

    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = { create, getAll };
