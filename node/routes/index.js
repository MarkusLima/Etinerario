import express from 'express';
import clientRoutes from './client.js';
import calcRoutes from './calc.js';

const routes = express.Router()

routes.get('/status', (req, res) => res.send('OK'))
routes.use('/client', clientRoutes)
routes.use('/calc', calcRoutes)

export default routes;