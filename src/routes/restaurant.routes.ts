import express from 'express';
import controller from '../controllers/restaurant.controller';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.restaurant.create), controller.createRestaurant);
router.get('/get/:restaurantId', controller.readRestaurant);
router.get('/get/', controller.readAll);
router.patch('/update/:restaurantId', ValidateSchema(Schemas.restaurant.update), controller.updateRestaurant);
router.delete('/delete/:restaurantId', controller.deleteRestaurant);

export = router;
