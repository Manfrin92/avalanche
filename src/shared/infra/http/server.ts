import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';

const app = express();
// app.use(cors());

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
