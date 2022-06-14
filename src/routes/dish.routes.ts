import express from 'express';
import controller from '../controllers/dish.controller';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.dish.create), controller.createDish);
router.get('/get/:dishId', controller.readDish);
router.get('/get/', controller.readAll);
router.patch('/update/:dishId', ValidateSchema(Schemas.dish.update), controller.updateDish);
router.delete('/delete/:dishId', controller.deleteDish);

export = router;
