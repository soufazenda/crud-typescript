import { Schema, model } from "mongoose"
import IUser from "../interfaces/IUser"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { appSecret } from "../utils/config"

const UserSchema = {
  cpfCnpj: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  companyName: String,
  slug: String,
  phone: String,
}

const User = new Schema(UserSchema, { timestamps: true })

User.methods.createToken = function () {
  return jwt.sign({ id: this._id }, appSecret)
}

User.methods.authenticate = async function (password): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

User.methods.fullName = function (): string {
  return this.firstName + " " + this.lastName
}

export default model<IUser>("User", User)
