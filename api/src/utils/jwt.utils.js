require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "";

const generateToken = (data) => jwt.sign(data, jwtSecret, { expiresIn: '24h' });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
    generateToken,
    verifyToken
}