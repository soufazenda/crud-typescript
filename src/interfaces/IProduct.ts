import { Document } from 'mongoose';

interface IProduct extends Document {
    title: string
    description: string
    price: string
    location: string
    galery: any
    seller: string
}

export default IProduct