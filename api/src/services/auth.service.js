const { generateToken } = require("../utils/jwt.utils");
const { comparePassword } = require("../utils/password.utils");
const User = require("../models/user.model");

exports.SignIn = async ({ identifier, password }) => {
  try {
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;

    let user;

    if (emailRegex.test(identifier)) {
      user = await User.findOne({
        email: { $regex: identifier.toLowerCase(), $options: "i" },
      });
    } else {
      user = await User.findOne({
        username: { $regex: identifier.toLowerCase(), $options: "i" },
      });
    }

    console.log(user);

    if (!user) {
      return {
        error: true,
        message: "Identifiant et/ou mot de passe incorrect.",
        statusCode: 400,
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: "Identifiant et/ou mot de passe incorrect.",
        statusCode: 400,
      };
    }

    const accessToken = await generateToken({ 
        id: user._id,
        username: user.username,
        email: user.email
     });

    if (!accessToken) {
      throw new Error("Erreur lors de la création d'un token utilisateur.");
    }

    return {
      error: false,
      message: "Connexion effectuée",
      statusCode: 200,
      data: { accessToken },
    };
  } catch (error) {
    console.error("SERVICE::AUTH::SignIn - ", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la connexion à votre compte, veuillez réessayer plus tard.",
      statusCode: 500,
    };
  }
};
