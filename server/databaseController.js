import SortingOptions from './utils/search.js';
import 'dotenv/config';
import sequelize from './sequelize.js';
import Biodiversity from './model.js';
import { Op } from 'sequelize';

const databaseController = {
  request: async (req, res, next) => {
    try {
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

      console.log(
        'request: ',
        county,
        category,
        taxonomicGroup,
        sorting,
        direction
      );

      const results = await Biodiversity.findAll({
        where: {
          county: { [Op.like]: county },
          category: { [Op.like]: category },
          taxonomicGroup: { [Op.like]: taxonomicGroup },
        },
        order: [[sorting, direction]],
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
      let input = req.query.input;
      let custom = req.query.custom;
      custom = SortingOptions[custom];

      console.log('Controller: ', input, custom);

      const results = await sequelize.query(
        `SELECT * from nys_biodiversity WHERE "${custom}" LIKE :input ORDER BY County`,
        {
          replacements: { input: `%${input}%` },
          type: sequelize.QueryTypes.SELECT,
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
