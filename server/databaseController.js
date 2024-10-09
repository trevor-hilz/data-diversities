import pkg from 'pg';
const { Client } = pkg;

// laptop
const client = new Client({
connectionString:
'postgresql://postgres:LeMaVor89@172.21.1.54:5432/nys_biodiversity',
});

//desktop
// const client = new Client({
//   connectionString:
//     'postgresql://postgres:LeMaVor89@172.27.22.33:5432/nys_biodiversity',
// });

client.connect();

const databaseController = {
  request: async (req, res, next) => {
    try {
      console.log('---> ENTERING REQUEST CONTROLLER <---');

      const test = await client.query(
        "SELECT * FROM nys_biodiversity WHERE County = 'Bronx' LIMIT 10"
      );

      res.locals.request = test.rows;

      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default databaseController;
