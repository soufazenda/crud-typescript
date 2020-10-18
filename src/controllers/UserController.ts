import { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from "../schemas/User"
import slugify from "slugify"
import to from "await-to-js"

class UserController {
  public async index(req: Request, res: Response) {
    const sellers = await User.find()

    return res.json(sellers)
  }

  public async create(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body

    if (!email || !firstName || !lastName || !password) {
      return res.statusUnprocessableEntity("Campos incompletos")
    }

    // Verifica se o email já existe na base de dados
    const exists = await User.findOne({ email: req.body.email })

    if (exists) {
      return res.statusUnprocessableEntity("Email já cadastrado")
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8)

    delete req.body.password

    Object.assign(req.body, {
      password: hashPassword,
      slug: slugify(`${req.body.companyNam}`).toLowerCase(),
    })

    // Cria o novo vendedor
    const user = await User.create(req.body)

    return res.json(user)
  }

  public async read(req: Request, res: Response) {
    const seller = await User.findOne({ slug: req.body.seller })
    if (!seller) {
      return res.statusNotFound("Vendedor não encontrado")
    }

    return res.json(seller)
  }

  public async update(req: Request, res: Response) {
    // Deve receber um objeto com o _id e as novas informações
    if (!req.body._id) {
      return res.statusNotFound("Usuário não encontrado")
    }

    const seller = req.body
    delete seller._id

    const updatedData = await User.findOneAndUpdate(req.body._id, seller)

    return res.statusOk("Usuário editado com sucesso!")
  }

  public async delete(req: Request, res: Response) {
    const { sellerId } = req.body

    const [findError, user] = await to(User.findById(sellerId).exec())
    if (findError || !user?.$isDeleted)
      res.statusInternalServerError("Erro ao procurar Usuário!")
    if (!user) res.statusNotFound("Usuário não encontrado!")

    return res.statusOk("Usuário deletado com sucesso!")
  }
}

export default new UserController()
