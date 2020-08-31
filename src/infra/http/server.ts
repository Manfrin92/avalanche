import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '../typeorm/index';

import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

app.use(routes);
