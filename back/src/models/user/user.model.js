import {User} from '../index.js';
import connection from "../../services/mysql_connection.js";

async function getAllUsers(ORM = true) {
    if (!ORM) {
        connection.query('SELECT * FROM USERS', (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await User.findAll({});
    }
}

async function addUser(user, ORM = true) {
    const newUser = Object.assign(user, {
        isAdmin: false,
        profilePicture: null
    });

    if (!ORM) {
        connection.query('INSERT INTO USERS SET ?', newUser, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await User.create(newUser);
    }
}

async function getUsers() {
    return await User.findAll({});
}

async function updateUser(user, ORM = true) {
    if (!ORM) {
        connection.query('UPDATE TOKENS SET ? WHERE email = ?', user, user.email, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await User.update(user, {
            where: { email: user.email }
        });
    }
}

async function checkIfUserExists(email) {
    return await User.findOne({
        where: { email: email }
    });
}

async function findUserByPk(id) {
    return await User.findByPk(id);
}

export {
    addUser,
    checkIfUserExists,
    getUsers,
    findUserByPk
}