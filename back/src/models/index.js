import sequelize from '../config/db.js';
import User from './user/user.mariadb.js';
import Task from './task/task.mariadb.js';
import Project from './project/project.mariadb.js';
import Invitation from './invitation/invitation.mariadb.js';
import Token from "./token/token.mariadb.js";

Project.hasMany(Invitation, {foreignKey: 'projectId', as: 'invitation'});
Invitation.belongsTo(Project, {foreignKey: 'projectId', as: 'project'});

User.hasMany(Invitation, {foreignKey: 'userId', as: 'invitation'});
Invitation.belongsTo(User, {foreignKey: 'userId', as: 'user'});

Project.hasMany(Task, {foreignKey: 'projectId', as: 'task'});
Task.belongsTo(Project, {foreignKey: 'projectId', as: 'project'});

User.hasMany(Task, {foreignKey: 'userId', as: 'task'});
Task.belongsTo(User, {foreignKey: 'userId', as: 'user'});

User.hasOne(Project, {foreignKey: 'userId', as: 'project'});
Project.belongsTo(User, {foreignKey: 'userId', as: 'user'});

export { sequelize, User, Task, Project, Invitation, Token };