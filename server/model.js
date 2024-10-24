import { Sequelize, DataTypes, Model, STRING } from 'sequelize';
import sequelize from './sequelize.js';

// laptop
// const sequelize = new Sequelize('postgresql://postgres:LeMaVor89@172.21.1.54:5432/nys_biodiversity');
//desktop
// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialectOptions: {
//     ssl: {
//       require: true, // This is required for AWS RDS if SSL is enforced
//       rejectUnauthorized: false, // You can set this to true if you want strict certificate validation
//     },
//   },
//   pool: {
//     max: 5, // Maximum number of connections in the pool
//     min: 0, // Minimum number of connections in the pool
//     acquire: 30000, // Maximum time (ms) to try to get a connection before throwing error
//     idle: 10000, // Maximum time (ms) that a connection can be idle before being released
//   },
//   clientMinMessages: 'notice',
// });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection established');
//   } catch (error) {
//     console.log('Unable to connect to database', error);
//   }
// })();

class Biodiversity extends Model {}

Biodiversity.init(
  {
    county: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxonomicGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxonomicSubgroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientificName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearLastDocumented: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nyListingStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    federalListingStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateConservationRank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    globalConservationRank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distributionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Biodiversity',
    tableName: 'nys_biodiversity',
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Test database synced successfully!');
  })
  .catch((error) => {
    console.error('Error syncing the test database:', error);
  });

console.log('model: ', Biodiversity === sequelize.models.Biodiversity);

export default sequelize;
