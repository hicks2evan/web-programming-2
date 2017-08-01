import express from 'express';
import * as controller from './recipes.controller';
import * as subcontroller from './reviews/reviews.controller';

let router = express.Router();

// GET methods
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/reviews', subcontroller.index);
router.get('/:id/reviews/:id', subcontroller.show);


// POST method
router.post('/', controller.create);
router.post('/:id/reviews', subcontroller.create);


// PUT method
router.put('/:id', controller.update);
router.put('/:id/reviews/:id', subcontroller.update);


// DELETE method
router.delete('/:id', controller.destroy);
router.delete('/:id/reviews/:id', subcontroller.destroy);


export {router};
