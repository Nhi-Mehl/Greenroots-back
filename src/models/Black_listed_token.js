import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";

class Blacklisted_token extends Model { }


Blacklisted_token.init(
    {
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiry: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'blacklisted_token',
        timestamps: false,
    }
);

export default Blacklisted_token;