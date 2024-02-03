import express from 'express';
import routes from './routes/index.js';
import credentials from './config/credencials.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(
  credentials.port_app, 
  () => console.log(`App running on port ${credentials.port_app}.`)
);
  