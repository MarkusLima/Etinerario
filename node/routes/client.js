import express from 'express';
import { all, findId, destroy, update, create } from '../controller/client.js';
import { requestFindId, requestDestroy, requestUpdate, requestCreate } from '../request/client.js';

const router = express.Router();
router.route('/').get(all);
router.route('/:id').get(requestFindId, findId);
router.route('/:id').delete(requestDestroy, destroy);
router.route('/:id').put(requestUpdate, update);
router.route('/').post(requestCreate, create);

export default router;