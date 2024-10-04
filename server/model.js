import { Sequelize } from 'sequelize';

const database = new Sequelize('postgresql://postgres:LeMaVor89@172.21.1.54:5432/nys_biodiversity');

(async() => {
  try{
    await database.authenticate();
    console.log('Database connection established')

} catch (error) {
    console.log('Unable to connect to database', error);
}
})();

export default database;