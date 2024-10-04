import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import request from './router.js';
import sequelize from './model.js';

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
sequelize;

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/request', request);

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  console.log(`server listening on port ${port}`);
});
