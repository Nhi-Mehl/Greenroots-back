import "dotenv/config";
import { Sequelize } from "sequelize";

// Déterminer quelle URL utiliser en fonction de l'environnement
const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PG_URL_PROD
    : process.env.PG_URL_DEV;

if (!databaseUrl) {
  throw new Error(
    "Erreur : La variable PG_URL_PROD ou PG_URL_DEV n'est pas définie !"
  );
}

const sequelize = new Sequelize(databaseUrl, {
  define: {
    underscored: true,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false, // Afficher les logs SQL en dev
});

export default sequelize;
