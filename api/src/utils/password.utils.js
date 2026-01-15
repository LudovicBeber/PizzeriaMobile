require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS || 10;

const hashPassword = async (password) => await bcrypt.hash(password, +saltRounds);

const comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

module.exports = {
    hashPassword,
    comparePassword
}