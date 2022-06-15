import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant {
    name: string;
    // chef: string;
    opens: string;
    closes: string;
    thumb: string;
    image: string;
    dishes: string | string[];
    reviews: string[];
    latitude: string;
    longitude: string;
    stars: number;
    isOpen: boolean;
    isPopular: boolean;
    isNew: boolean;
}

export interface IRestaurantModel extends IRestaurant, Document {}

const RestaurantSchema = new Schema(
    {
        name: { type: String, required: true },
        opens: { type: String, required: true },
        closes: { type: String, required: true },
        thumb: { type: String, required: true },
        image: { type: String, required: true },
        dishes: [{ type: Schema.Types.ObjectId, required: true, ref: 'Dish' }],
        reviews: { type: [String], required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        stars: { type: Number, required: true },
        isOpen: { type: Boolean, required: true },
        isPopular: { type: Boolean, required: true },
        isNew: { type: Boolean, required: true }
    },
    {
        versionKey: false,
        supressReservedKeysWarning: true
    }
);

export default mongoose.model<IRestaurantModel>('Restaurant', RestaurantSchema);
