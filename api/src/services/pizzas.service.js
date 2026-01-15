const Pizza = require("../models/pizza.model");

exports.Create = async ({ title, ingredients, price }) => {
  try {
    const isExist = await Pizza.findOne({ title });

    if (isExist) {
      return {
        error: true,
        message: "Une pizza existe déjà avec ce titre.",
        statusCode: 400,
      };
    }

    const pizzaData = {
      title,
      ingredients,
      price,
    };

    const pizza = await Pizza.create(pizzaData);

    return {
      error: false,
      message: "La pizza a bien été créé.",
      data: { pizza: pizza },
      statusCode: 201,
    };
  } catch (error) {
    console.error("SERVICE::PIZZAS::Create - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la création d'une pizza, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};

exports.GetAll = async () => {
  try {
    const pizzas = await Pizza.find();

    return {
      error: false,
      message: "Pizzas récupérées.",
      data: {
        pizzas: pizzas,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("SERVICE::PIZZAS::GetAll - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la récupération des pizzas, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};

exports.GetOne = async (id) => {
  try {
    const pizza = await Pizza.findById(id);

    if (!pizza) {
      return {
        error: true,
        message: "La pizza est introuvable.",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "Pizza récupérée.",
      data: {
        pizza: pizza,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("SERVICE::PIZZAS::GetOne - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la récupération d'une pizza, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};

exports.Update = async (id, { title, ingredients, price }) => {
  try {
    const pizza = await Pizza.findById(id);

    if (!pizza) {
      return {
        error: true,
        message: "La pizza est introuvable.",
        statusCode: 404,
      };
    }

    console.log(title, pizza.title)
    if (title !== pizza.title) {
      // Rechercher un element qui a le meme title que dans la requête mais qui a un id différent que le produit récupéré.
      const isExist = await Pizza.find({
        $and: [{ title }, { _id: { $ne: id } }],
      });

      if (isExist.length) {
        return {
          error: true,
          message: "Une pizza existe déjà avec ce nom.",
          statusCode: 400,
        };
      }
    }

    const updatedPizzaData = {
      title: title ? title : pizza.title,
      ingredients: ingredients ? ingredients : pizza.ingredients,
      price: price ? price : pizza.price,
    };

    // Mettre à jour le produit
    const updatedPizza = await Pizza.findByIdAndUpdate(
      id,
      updatedPizzaData,
      { new: true }
    );

    return {
      error: false,
      message: "Pizza mise à jour.",
      data: {
        pizza: updatedPizza,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("SERVICE::PIZZAS::Update - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la mise à jour d'une pizza, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};

exports.Delete = async (id) => {
  try {
    const pizza = await Pizza.findById(id);
    
    if (!pizza) {
      return {
        error: true,
        message: "La pizza est introuvable.",
        statusCode: 404,
      };
    }

    // Supprimer le produit
    await Pizza.findByIdAndDelete(id);

    return {
      error: false,
      message: "Pizza supprimée.",
      statusCode: 200,
    };
  } catch (error) {
    console.error("SERVICE::PIZZAS::Delete - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la suppression d'une pizza, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};
