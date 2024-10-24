// import pkg from 'pg';
// const { Client } = pkg;
// import SortingOptions from './utils/search.js';
// import 'dotenv/config';
// import { Sequelize } from 'sequelize';

// // laptop
// // const client = new Client({
// // connectionString:
// // 'postgresql://postgres:LeMaVor89@172.21.1.54:5432/nys_biodiversity',
// // });

// //desktop
// // const client = new Client({
// //   connectionString:
// //     'postgresql://postgres:LeMaVor89@172.27.22.33:5432/nys_biodiversity',
// // });

// //AWS RDS
// // const sequelize = new Sequelize({
// //   dialect: 'postgres',
// //   database: process.env.DB_NAME,
// //   user: process.env.DB_USERNAME,
// //   password: process.env.DB_PASSWORD,
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   dialectOptions: {
// //     ssl: {
// //       require: true, // This is required for AWS RDS if SSL is enforced
// //       rejectUnauthorized: false, // You can set this to true if you want strict certificate validation
// //     },
// //   },
// //   pool: {
// //     max: 5, // Maximum number of connections in the pool
// //     min: 0, // Minimum number of connections in the pool
// //     acquire: 30000, // Maximum time (ms) to try to get a connection before throwing error
// //     idle: 10000, // Maximum time (ms) that a connection can be idle before being released
// //   },
// //   clientMinMessages: 'notice',
// // });

// // client.connect();

// const databaseController = {
//   request: async (req, res, next) => {
//     try {
//       console.log('---> ENTERING REQUEST CONTROLLER <---');

//       let county = req.query.county;
//       let category = req.query.category;
//       let taxonomicGroup = req.query.taxonomicGroup;
//       let sorting = req.query.sorting;
//       sorting = SortingOptions[sorting];
//       let direction =
//         req.query.direction && req.query.direction.toUpperCase() === 'DESC'
//           ? 'DESC'
//           : 'ASC';

//       if (county === 'All') county = '%';
//       if (category === 'All') category = '%';
//       if (taxonomicGroup === 'All') taxonomicGroup = '%';
//       console.log(
//         'request: ',
//         county,
//         category,
//         taxonomicGroup,
//         sorting,
//         direction
//       );

//       const query = `SELECT * FROM nys_biodiversity WHERE county LIKE $1 AND category LIKE $2 AND "taxonomicGroup" LIKE $3 ORDER BY "${sorting}" ${direction}`;

//       const test = await client.query(query, [
//         county,
//         category,
//         taxonomicGroup,
//       ]);

//       res.locals.request = test.rows;

//       return next();
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   custom: async (req, res, next) => {
//     try {
//       console.log('---> ENTERING CUSTOM CONTROLLER <---');
//       let input = req.query.input;
//       let custom = req.query.custom;
//       custom = SortingOptions[custom];

//       console.log('Controller: ', input, custom);

//       const query = `SELECT * from nys_biodiversity WHERE "${custom}" LIKE $1 ORDER BY County`;
//       const test = await client.query(query, [`%${input}%`]);

//       res.locals.custom = test.rows;

//       return next();
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   },
// };

// export default databaseController;
import SortingOptions from './utils/search.js';
import 'dotenv/config';
import sequelize from './sequelize.js';
import Biodiversity from './model.js';

const databaseController = {
  request: async (req, res, next) => {
    try {
      console.log('---> ENTERING REQUEST CONTROLLER <---');

      let county = req.query.county;
      let category = req.query.category;
      let taxonomicGroup = req.query.taxonomicGroup;
      let sorting = req.query.sorting;
      sorting = SortingOptions[sorting];
      let direction =
        req.query.direction && req.query.direction.toUpperCase() === 'DESC'
          ? 'DESC'
          : 'ASC';

      // Replace 'All' with '%' for the LIKE query
      if (county === 'All') county = '%';
      if (category === 'All') category = '%';
      if (taxonomicGroup === 'All') taxonomicGroup = '%';

      console.log(
        'request: ',
        county,
        category,
        taxonomicGroup,
        sorting,
        direction
      );

      // Use Sequelize's findAll method instead of raw query
      const results = await Biodiversity.findAll({
        where: {
          county: { [sequelize.Op.like]: county },
          category: { [sequelize.Op.like]: category },
          taxonomicGroup: { [sequelize.Op.like]: taxonomicGroup },
        },
        order: [[sorting, direction]], // Sequelize's order syntax
      });

      res.locals.request = results;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  custom: async (req, res, next) => {
    try {
      console.log('---> ENTERING CUSTOM CONTROLLER <---');
      let input = req.query.input;
      let custom = req.query.custom;
      custom = SortingOptions[custom];

      console.log('Controller: ', input, custom);

      // Use Sequelize raw query as an alternative, or modify to use findAll
      const results = await sequelize.query(
        `SELECT * from nys_biodiversity WHERE "${custom}" LIKE :input ORDER BY County`,
        {
          replacements: { input: `%${input}%` },
          type: sequelize.QueryTypes.SELECT, // Return raw data as an array of objects
        }
      );

      res.locals.custom = results;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default databaseController;
