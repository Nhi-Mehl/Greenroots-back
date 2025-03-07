import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/client.js';

class Species extends Model { }

Species.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scientific_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        co2_compensation: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'species',
    },
);

export default Species;