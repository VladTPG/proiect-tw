import sequelize from '../../config/db.js';
import { DataTypes } from 'sequelize';

const Task = sequelize.define(
    'Task',
    {
        id: {
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        tableName: 'tasks',
        timestamps: true,
    }
);

export default Task;

