import { Schema, model, Document } from 'mongoose';

interface ProductInterface extends Document {
    title: string
    description: string
    price: string
    location: string
    galery: any
    seller: string
}

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

export default model<ProductInterface>('Product', ProductSchema)