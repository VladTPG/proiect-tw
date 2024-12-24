import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

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
    },
    logging: false
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
