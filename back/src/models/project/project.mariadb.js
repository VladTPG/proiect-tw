import sequelize from '../../config/db.js';
import { DataTypes } from 'sequelize';

const Project = sequelize.define(
    'Project',
    {
        id:{
            primaryKey:true,
            type:DataTypes.BIGINT,
            autoIncrement:true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'projects',
        timestamps: true,
    }
);

export default Project;

