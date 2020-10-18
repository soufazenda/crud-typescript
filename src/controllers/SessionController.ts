import { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from "../schemas/User"
import to from "await-to-js"

class SessionController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body

    const [findUserError, user] = await to(User.findOne({ email }).exec())

    if (findUserError)
      return res.statusInternalServerError(
        "Não foi possível buscar o usuário. Tente novamente mais tarde."
      )

    if (!user) {
      return res.statusUnauthorized("Email ou senha inválidos!")
    }

    const authorized = await user.authenticate(password)

    if (!authorized) {
      return res.statusUnauthorized("Email ou senha inválidos!")
    }

    const accessToken = user.createToken()

    return res.statusOk("Logado com sucesso!", {
      accessToken,
      issuedAt: new Date(),
    })
  }
}

export default new SessionController()
