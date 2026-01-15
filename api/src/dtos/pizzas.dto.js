const Joi = require("joi");

const createPizzaSchema = Joi.object({
    title: Joi.string().required(),
    ingredients: Joi.string().required(),
    price: Joi.string().required()
});

const updatePizzaSchema = createPizzaSchema;

module.exports = {
    createPizzaSchema,
    updatePizzaSchema
}