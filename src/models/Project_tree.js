import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/client.js';

class Project_tree extends Model { }

Project_tree.init(
    {
        basic_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        current_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'project_tree',
    },
);

export default Project_tree;