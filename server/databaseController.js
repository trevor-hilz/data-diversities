import pkg from 'pg';
const { Client } = pkg;
import SortingOptions from './utils/search.js';

// laptop
// const client = new Client({
// connectionString:
// 'postgresql://postgres:LeMaVor89@172.21.1.54:5432/nys_biodiversity',
// });

//desktop
const client = new Client({
  connectionString:
    'postgresql://postgres:LeMaVor89@172.27.22.33:5432/nys_biodiversity',
});

client.connect();

const databaseController = {
  request: async (req, res, next) => {
    try {
      console.log('---> ENTERING REQUEST CONTROLLER <---');
      console.log(req.query.sorting);

      let county = req.query.county;
      let category = req.query.category;
      let taxonomicGroup = req.query.taxonomicGroup;
      let sorting = req.query.sorting;
      sorting = SortingOptions[sorting];
      let direction =
        req.query.direction && req.query.direction.toUpperCase() === 'DESC'
          ? 'DESC'
          : 'ASC';

      if (county === 'All') county = '%';
      if (category === 'All') category = '%';
      if (taxonomicGroup === 'All') taxonomicGroup = '%';
      console.log(county, category, taxonomicGroup, sorting, direction);

      const query = `SELECT * FROM nys_biodiversity WHERE county LIKE $1 AND category LIKE $2 AND "taxonomicGroup" LIKE $3 ORDER BY "${sorting}" ${direction}`;

      const test = await client.query(query, [
        county,
        category,
        taxonomicGroup,
      ]);

      res.locals.request = test.rows;

      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default databaseController;
