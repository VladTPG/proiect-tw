import sequelize from '../../config/db.js';
import { DataTypes } from 'sequelize';

const Token = sequelize.define(
    'Token',
    {
        id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'tokens',
        timestamps: true,
    }
);

export default Token;

