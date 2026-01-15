const pizzasController = require("../controllers/pizzas.controller");
const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const validateWithJoi = require("../middlewares/validation.middleware");
const { createPizzaSchema, updatePizzaSchema } = require("../dtos/pizzas.dto");

router.post('/', authenticateUser, validateWithJoi(createPizzaSchema), pizzasController.Create);
router.get('/', pizzasController.GetAll);
router.get('/:id', pizzasController.GetOne);
router.patch('/:id', authenticateUser, validateWithJoi(updatePizzaSchema), pizzasController.Update);
router.delete('/:id', authenticateUser, pizzasController.Delete);

module.exports = router;