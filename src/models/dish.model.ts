import mongoose, { Document, Schema } from 'mongoose';

export interface IDish {
    name: string;
    ingredients: string;
    image: string;
    icon: string;
    price: number;
}

export interface IDishModel extends IDish, Document {}

const DishSchema = new Schema(
    {
        name: { type: String, required: true },
        ingredients: { type: String, required: true },
        image: { type: String, required: true },
        icon: { type: String, required: true },
        price: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDishModel>('Dish', DishSchema);
