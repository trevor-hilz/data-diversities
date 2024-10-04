const controller = {};
import Biodiversity from './model.js';

controller.request = async (req, res, next) => {
  try {
    console.log('---> ENTERING REQUEST CONTROLLER <---');
    const test = await Biodiversity.findAll({
      limit: 10,
    });

    if (!test || test.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.locals.request = test;

    console.log('data received: ', test);

    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default controller;
