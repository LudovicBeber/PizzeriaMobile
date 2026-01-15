const { hashPassword } = require("../utils/password.utils");
const User = require("../models/user.model");

exports.CreateUser = async ({ email, username, password }) => {
  try {
    // console.log({ email, username, password });
    // Vérification de l'existance d'un utilisateur identique (email et/ou username)
    const isExist = await User.find({
      $or: [{ email: email }, { username: username }],
    });

    if (isExist?.length) {
      return {
        error: true,
        message: "Utilisateur déjà existant.",
        statusCode: 400,
      };
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      email,
      username,
      password: hashedPassword,
    };

    await User.create(userData);

    return {
      error: false,
      message: "Votre compte a bien été créé",
      statusCode: 201,
    };
  } catch (error) {
    console.error("SERVICE::USERS::CreateUser - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la création de votre compte, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};
