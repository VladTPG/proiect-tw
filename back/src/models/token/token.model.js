import {Token} from "../index.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connection from "../../services/mysql_connection.js";

dotenv.config();

async function generateToken(user, ORM = true) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    if (!ORM) {
        connection.query('INSERT INTO TOKENS SET ?', { token }, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        await Token.create({ token });
    }
    return token;
}

async function deleteToken(user, ORM = true){
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    if (!ORM) {
        connection.query('DELETE FROM TOKENS WHERE token = ?', token, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return Token.destroy({
            where: { token }
        })
    }
}

export {
    generateToken,
    deleteToken
}