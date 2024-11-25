import sequelize from '../../config/db.js';
import { DataTypes } from 'sequelize';

const Invitation = sequelize.define(
    'Invitation',
    {
        id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'invitations',
        timestamps: true,
    }
);

export default Invitation;

