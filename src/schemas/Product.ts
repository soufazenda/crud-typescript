import { Schema, model, Document } from 'mongoose';
import IProduct from '../interfaces/IProduct';

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: String,
    location: String,
    tags: String,
    galery: Array,
    seller: String
}, {
    timestamps: true
})

export default model<IProduct>('Product', ProductSchema)