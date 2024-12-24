import { Token } from "../index.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function generateToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    await Token.create({ token });
    return token;
}

async function deleteToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return Token.destroy({
        where: { token }
    });
}

export {
    generateToken,
    deleteToken
}