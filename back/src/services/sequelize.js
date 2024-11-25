import { sequelize } from "../models/index.js";

async function syncDB() {
    await sequelize.sync({ alter: true });
    console.log('DB successfully synced!');
}

export default syncDB;