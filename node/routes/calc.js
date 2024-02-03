import express from 'express';
import { calculaDistancia } from '../controller/calc.js';

const router = express.Router();

router.route('/').get(calculaDistancia);

export default router;