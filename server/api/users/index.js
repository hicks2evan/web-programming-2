import express from 'express';
import * as controller from './users.controller';

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.delete('/:id', controller.destroy);


export {router};

