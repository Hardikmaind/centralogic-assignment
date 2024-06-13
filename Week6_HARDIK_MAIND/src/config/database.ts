// import { Pool } from 'pg';
import { Sequelize } from 'sequelize';
import credentials  from '../common/credentials';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
export default sequelize;
