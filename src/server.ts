import express from 'express';

import routes from './routes';

const app = express();

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

app.get('/', (request, response) => response.json({ message: 'o   k' }));
