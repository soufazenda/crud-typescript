import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'
import { tokenDuration } from '@configuration/env'

class SessionController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body

    const [findUserError, user] = await to(User.findOne({ email }))

    if (findUserError)
      return res.statusInternalServerError(
        'Não foi possível buscar o usuário. Tente novamente mais tarde.'
      )

    if (!user) {
      return res.statusUnauthorized('Email ou senha inválidos!')
    }

    const authorized = await user.authenticate(password)

    if (!authorized) {
      return res.statusUnauthorized('Email ou senha inválidos!')
    }

    if (!user.confirmedEmail) {
      return res.statusUnauthorized('Email não Confirmado!')
    }

    const accessToken = user.generateToken()

    return res.statusOk('Logado com sucesso!', {
      accessToken,
      issuedAt: new Date(),
      expiresIn: tokenDuration,
    })
  }
}

export default new SessionController()
