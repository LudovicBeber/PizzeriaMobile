const pizzaService = require("../services/pizzas.service");

exports.Create = async (req, res) => {
  const data = req.body;

  const result = await pizzaService.Create(data);

  return res.status(result.statusCode).json(result);
};

exports.GetAll = async (req, res) => {
  const result = await pizzaService.GetAll();

  return res.status(result.statusCode).json(result);
};

exports.GetOne = async (req, res) => {
  const { id } = req.params;

  const result = await pizzaService.GetOne(id);

  return res.status(result.statusCode).json(result);
};

exports.Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await pizzaService.Update(id, data);

  return res.status(result.statusCode).json(result);
};

exports.Delete = async (req, res) => {
  const { id } = req.params;

  const result = await pizzaService.Delete(id);

  return res.status(result.statusCode).json(result);
};
