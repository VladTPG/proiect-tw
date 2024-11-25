import sequelize from '../../config/db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
    'User',
    {
        id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.BLOB,
            allowNull: true
        }
    },
    {
        tableName: 'users',
        timestamps: true
    }
);

export default User;

