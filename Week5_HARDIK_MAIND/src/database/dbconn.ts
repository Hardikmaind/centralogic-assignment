import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});


sequelize.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized with the database.");
  })
  .catch((err) => {
    console.error("Unable to synchronize models with the database:", err);
  });

export default sequelize;
