import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/client.js';

class Order_line extends Model { }

Order_line.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        sequelize,
        tableName: 'order_line',
    },
);

export default Order_line;