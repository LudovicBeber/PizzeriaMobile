const usersService = require("../services/users.service");
const authService = require("../services/auth.service");

exports.SignUp = async (req, res) => {
    const data = req.body;

    const result = await usersService.CreateUser(data);

    return res.status(result.statusCode).json(result);
}

exports.SignIn = async (req, res) => {
    const data = req.body;

    const result = await authService.SignIn(data);

    return res.status(result.statusCode).json(result);
}