const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
	'Customer',
	new mongoose.Schema({
		name: {
			type: String,
			required: [true, 'name is required'],
			minlength: 3,
			maxlength: 50
		},
		isGold: {
			type: Boolean,
			default: false
		},
		phone: {
			type: String,
			required: [true, 'phone is required'],
			length: [10, 'Must be a 10 digit number']
		}
	})
);

/**
 *
 * @param {JSON Object} customer
 * Validate the Object:
 * 1. Must have a name field
 * 2. Name must be longer than 2 letters
 */
function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		phone: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.required(),
		isGold: Joi.boolean()
	});
	return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
