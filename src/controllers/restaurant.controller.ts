import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant.model';

const createRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const { name, chef, opens, closes, thumb, image, dishes, reviews, latitude, longitude, stars, isOpen, isPopular, isNew } = req.body;

    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name,
        chef,
        opens,
        closes,
        thumb,
        image,
        dishes,
        reviews,
        latitude,
        longitude,
        stars,
        isOpen,
        isPopular,
        isNew
    });

    return restaurant
        .save()
        .then((restaurant) => res.status(201).json({ restaurant }))
        .catch((error) => res.status(500).json({ error }));
};
const readRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return (
        Restaurant.findById(restaurantId)
            .populate('chef', '_id')
            // .select('-__v')
            .then((restaurant) => (restaurant ? res.status(200).json({ restaurant }) : res.status(404).json({ message: 'Restaurant not found' })))
            .catch((error) => res.status(500).json({ error }))
    );
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return (
        Restaurant.find()
            .populate('chef', '_id')
            // .select('-__v')
            .then((restaurants) => res.status(200).json({ restaurants }))
            .catch((error) => res.status(500).json({ error: error.message }))
    );
};
const updateRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (restaurant) {
                restaurant.set(req.body);

                return restaurant
                    .save()
                    .then((restaurant) => res.status(201).json({ restaurant }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findByIdAndDelete(restaurantId)
        .then((restaurant) => (restaurant ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createRestaurant,
    readRestaurant,
    readAll,
    updateRestaurant,
    deleteRestaurant
};
