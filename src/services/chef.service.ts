import mongoose from 'mongoose';
import Chef from '../models/chef.model';

const createChef = async ({ name, image, description }: any) => {
    try {
        const newChef = new Chef({
            _id: new mongoose.Types.ObjectId(),
            name,
            image,
            description
        });
        await newChef.save();
        return newChef;
    } catch (err) {
        throw err;
    }
};
const deleteChef = async (id: string) => {
    try {
        return await Chef.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
};
const getChefById = async (id: string) => {
    try {
        return await Chef.findById(id).populate('restaurant', '_id');
    } catch (err) {
        throw err;
    }
};
const getChefs = async () => {
    try {
        return await Chef.find().populate('restaurant', '_id');
    } catch (err) {
        throw err;
    }
};
const updateChef = async (chefId: any, data: any) => {
    try {
        return await Chef.findByIdAndUpdate(chefId, data, { new: true });
    } catch (err) {
        throw err;
    }
};
export const ChefService = {
    createChef,
    deleteChef,
    getChefById,
    getChefs,
    updateChef
};
