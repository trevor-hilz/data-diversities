import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true, // This is required for AWS RDS if SSL is enforced
      rejectUnauthorized: false, // You can set this to true if you want strict certificate validation
    },
  },
  pool: {
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to try to get a connection before throwing error
    idle: 10000, // Maximum time (ms) that a connection can be idle before being released
  },
  clientMinMessages: 'notice',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
  } catch (error) {
    console.log('Unable to connect to database', error);
  }
})();

export default sequelize
