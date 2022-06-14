import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Chef from '../models/chef.model';

const createChef = (req: Request, res: Response, next: NextFunction) => {
    const { name, image, description } = req.body;

    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name,
        image,
        description
    });

    return chef
        .save()
        .then((chef) => res.status(201).json({ chef }))
        .catch((error) => res.status(500).json({ error }));
};
const readChef = (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return (
        Chef.findById(chefId)
            // .populate('restaurant')
            // .select('-__v')
            .then((chef) => (chef ? res.status(200).json({ chef }) : res.status(404).json({ message: 'Chef not found' })))
            .catch((error) => res.status(500).json({ error }))
    );
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return (
        Chef.find()
            // .populate('restaurant')
            // .select('-__v')
            .then((chefs) => res.status(200).json({ chefs }))
            .catch((error) => res.status(500).json({ error }))
    );
};
const updateChef = (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return Chef.findById(chefId)
        .then((chef) => {
            if (chef) {
                chef.set(req.body);

                return chef
                    .save()
                    .then((chef) => res.status(201).json({ chef }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteChef = (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return Chef.findByIdAndDelete(chefId)
        .then((chef) => (chef ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createChef,
    readChef,
    readAll,
    updateChef,
    deleteChef
};
