import mongoose, { Document, Schema } from 'mongoose';

export interface IChef {
    name: string;
    image: string;
    description: string;
    // restaurant: string | string[];
}

export interface IChefModel extends IChef, Document {}

const ChefSchema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true }
        // restaurant: [{ type: Schema.Types.ObjectId, required: true, ref: 'Restaurant' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChef>('Chef', ChefSchema);
