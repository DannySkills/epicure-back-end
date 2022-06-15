import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { IChef } from '../models/chef.model';
import { IRestaurant } from '../models/restaurant.model';
import { IDish } from '../models/dish.model';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    chef: {
        create: Joi.object<IChef>({
            name: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
            restaurant: Joi.array()
                .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
                .required()
        }),
        update: Joi.object<IChef>({
            name: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
            restaurant: Joi.array()
                .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
                .required()
        })
    },
    restaurant: {
        create: Joi.object<IRestaurant>({
            name: Joi.string().required(),
            opens: Joi.string().required(),
            closes: Joi.string().required(),
            thumb: Joi.string().required(),
            image: Joi.string().required(),
            dishes: Joi.array()
                .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
                .required(),
            reviews: Joi.array(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            stars: Joi.number().required(),
            isOpen: Joi.boolean().required(),
            isPopular: Joi.boolean().required(),
            isNew: Joi.boolean().required()
        }),
        update: Joi.object<IRestaurant>({
            name: Joi.string().required(),
            opens: Joi.string().required(),
            closes: Joi.string().required(),
            thumb: Joi.string().required(),
            image: Joi.string().required(),
            dishes: Joi.array()
                .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
                .required(),
            reviews: Joi.array(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            stars: Joi.number().required(),
            isOpen: Joi.boolean().required(),
            isPopular: Joi.boolean().required(),
            isNew: Joi.boolean().required()
        })
    },
    dish: {
        create: Joi.object<IDish>({
            name: Joi.string().required(),
            ingredients: Joi.string().required(),
            image: Joi.string().required(),
            icon: Joi.string().required(),
            price: Joi.number().required()
        }),
        update: Joi.object<IDish>({
            name: Joi.string().required(),
            ingredients: Joi.string().required(),
            image: Joi.string().required(),
            icon: Joi.string().required(),
            price: Joi.number().required()
        })
    }
};
