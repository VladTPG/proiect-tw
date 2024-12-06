import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import {flatten} from "express/lib/utils.js";

dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         logging: false
//     }
// );

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
