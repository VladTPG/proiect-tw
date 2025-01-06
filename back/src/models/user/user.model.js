import { User } from "../index.js";

async function addUser(user) {
  const newUser = Object.assign(user, {
    isAdmin: user.isAdmin || false,
    profilePicture: null,
  });
  return await User.create(newUser);
}

async function getUsers() {
  return await User.findAll({});
}

async function updateUser(user) {
  return await User.update(user, {
    where: { email: user.email },
  });
}

async function checkIfUserExists(email) {
  return await User.findOne({
    where: { email: email },
  });
}

async function findUserByPk(id) {
  return await User.findByPk(id);
}

export { addUser, checkIfUserExists, getUsers, findUserByPk };
