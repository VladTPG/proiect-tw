import {addUser, checkIfUserExists, findUserByPk, getUsers} from "../../models/user/user.model.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import {deleteToken, generateToken} from "../../models/token/token.model.js";

async function httpAddUser(req, res) {
    const user = req.body;
    const passOptions = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }

    if (!user.email || !user.password || !user.displayName || !user.displayName.length) {
        return res.status(400).json({
            error: 'Missing required property!'
        })
    }

    if (!validator.isEmail(user.email)) {
        return res.status(400).json({
            error: 'Invalid email structure!'
        })
    }

    if (!validator.isStrongPassword(user.password, passOptions)) {
        return res.status(400).json({
            error: 'Weak password! Password must contain: min 8 length, min 1 lowercase, uppercase character/s and min 1 number.'
        })
    }

    if (await checkIfUserExists(user.email)) {
        return res.status(400).json({
            error: 'User already exists!'
        })
    }

    user.password = await bcrypt.hash(user.password, 10);

    const addedUser = await addUser(user);
    const token = await generateToken({ id: user.id, email: user.email });

    return res.status(201).json({
        ok: 1,
        user: addedUser,
        token
    })
}

async function httpGetAllUsers(req, res) {
    return res.status(200).json(await getUsers());
}

async function httpLogin(req, res) {
    const { email, password } = req.body;

        const reqUser = await checkIfUserExists(email);
        if (!reqUser) {
            return res.status(401).json({
                error: 'No users with the provided email exists!'
            })
        }
        
        const user = reqUser.dataValues;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid password!'
            })
        }

        const token = await generateToken({ id: user.id, email: user.email });
        return res.status(200).json({
            ok: 1,
            user,
            token
        });
}

async function httpLogout(req, res) {
    const user = req.body.user;
    const rowDelCount = await deleteToken(user);

    if (rowDelCount === 1) {
        return res.status(200).json({
            message: `User ${user.email} access token was successfully deleted!`
        })
    }
    else {
        return res.status(401).json({
            error: `User ${user.email}: access token couldn't be deleted!`
        })
    }
}

async function httpUpdateUser(req, res) {
    const { id } = req.params;
    const updatedUser = req.body;

    try {
        const user = await findUserByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = await bcrypt.hash(user.password, 10);
        
        await user.update(updatedUser);

        return res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    httpGetAllUsers,
    httpAddUser,
    httpLogin,
    httpLogout,
    httpUpdateUser
}