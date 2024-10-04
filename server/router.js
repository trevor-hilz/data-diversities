import databaseController from './databaseController.js';
import express from 'express';
const router = express.Router();

router.use('/', databaseController.request, (req, res) => {
  console.log('---> ENTERING REQUEST ROUTER <---');
  console.log('data to return: ', res.locals.request);
  return res.status(200).json(res.locals.request);
});

export default router;
