import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Dish from '../models/dish.model';

const createDish = (req: Request, res: Response, next: NextFunction) => {
    const { name, restaurant, ingredients, image, icon, price } = req.body;

    const dish = new Dish({
        _id: new mongoose.Types.ObjectId(),
        name,
        restaurant,
        ingredients,
        image,
        icon,
        price
    });

    return dish
        .save()
        .then((dish) => res.status(201).json({ dish }))
        .catch((error) => res.status(500).json({ error }));
};
const readDish = (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return (
        Dish.findById(dishId)
            // .populate('restaurant', '_id')
            .then((dish) => (dish ? res.status(200).json({ dish }) : res.status(404).json({ message: 'Dish not found' })))
            .catch((error) => res.status(500).json({ error }))
    );
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return (
        Dish.find()
            // .populate('restaurant', '_id')
            .then((dishs) => res.status(200).json({ dishs }))
            .catch((error) => res.status(500).json({ error }))
    );
};
const updateDish = (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return Dish.findById(dishId)
        .then((dish) => {
            if (dish) {
                dish.set(req.body);

                return dish
                    .save()
                    .then((dish) => res.status(201).json({ dish }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteDish = (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return Dish.findByIdAndDelete(dishId)
        .then((dish) => (dish ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createDish,
    readDish,
    readAll,
    updateDish,
    deleteDish
};
