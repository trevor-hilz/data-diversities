import databaseController from './databaseController.js';
import express from 'express';
const router = express.Router();

router.use('/custom', databaseController.custom, (req, res) => {
  console.log('---> ENTERING CUSTOM ROUTER <---');
  return res.status(200).json(res.locals.custom);
});

router.use('/', databaseController.request, (req, res) => {
  console.log('---> ENTERING REQUEST ROUTER <---');
  return res.status(200).json(res.locals.request);
});

export default router;
