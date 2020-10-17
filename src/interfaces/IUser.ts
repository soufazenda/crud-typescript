import { Document } from "mongoose"

interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  password: string
  slug: string
  cpfCnpj?: string
  companyName?: string
  phone?: string
  authenticate: (password: string) => Promise<boolean>
  createToken: () => string
  fullName: () => string
}

export default IUser
