import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
    email: string
    firstName: string
    lastName: string
    password: string
    slug: string
    cpfCnpj?: string
    companyName?: string
    phone?: string
}

const UserSchema = new Schema({
    cpfCnpj: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String, // TODO: Criptografar a senha
    companyName: String,
    slug: String,
    phone: String
}, {
    timestamps: true
})

// UserSchema.methods.fullName = function (): string {
//     return this.firstName + ' ' + this.lastName
// }

export default model<UserInterface>('User', UserSchema)