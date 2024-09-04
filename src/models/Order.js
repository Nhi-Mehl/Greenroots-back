import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/client.js';

class Order extends Model { }

Order.init(
    {
        amount: {
            type: DataTypes.DECIMAL,
        },
        date: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: 'order',
    },
);

export default Order;