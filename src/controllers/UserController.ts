import bcrypt from 'bcrypt'
import to from 'await-to-js'
import User from '../models/User'
import validate from '../utils/validate'
import { Request, Response } from 'express'
import { emailSecret } from '../configuration/env'
import { Mailer } from '../mailer'
import jwt from 'jsonwebtoken'
class UserController {
  public async index(req: Request, res: Response) {
    const sellers = await User.find()

    return res.json(sellers)
  }

  public async create(req: Request, res: Response) {
    const {
      email,
      firstName,
      lastName,
      password,
      birthdate: rawBirthdate,
      phone,
      cpfCnpj,
    }: User = req.body
    const birthdate = new Date(rawBirthdate)
    const invalidFields = validate({
      email,
      firstName,
      lastName,
      password,
      birthdate,
    })
    if (invalidFields != null) {
      return res.statusUnprocessableEntity('Campos Inválidos!', invalidFields)
    }

    // Verifica se o email já existe na base de dados
    const foundUser = await User.findOne({ where: [{ cpfCnpj }, { email }] })

    if (foundUser) {
      if (foundUser.email === email)
        return res.statusUnprocessableEntity(
          'Email já cadastrado no sistema!',
          { fields: [{ field: 'email', message: 'Email já cadastrado' }] }
        )

      if (foundUser.cpfCnpj === cpfCnpj)
        return res.statusUnprocessableEntity(
          'CPF ou CNPJ já cadastrado no sistema',
          { fields: [{ field: 'cpfCnpj', message: 'CPF/CNPJ já cadastrado' }] }
        )

      return res.statusUnprocessableEntity('Usuário já cadastrado')
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8)

    delete req.body.password

    Object.assign(req.body, {
      password: hashPassword,
    })

    const token = jwt.sign({}, emailSecret, { expiresIn: '3 days' })
    const [error, user] = await to(
      User.insert({
        ...req.body,
        firstName: firstName.trim().toLowerCase(),
        lastName: lastName.trim().toLowerCase(),
        confirmEmailToken: token,
      })
    )
    if (error || !user) {
      console.error(error)
      return res.statusInternalServerError('Não foi possível criar usuário!')
    }

    const mailer = new Mailer()

    mailer.sendEmailConfirmation({ to: email, token, username: firstName })
    console.log(user)
    return res.statusCreated('Usúario criado com sucesso!', user.identifiers[0])
  }

  public async read(req: Request, res: Response) {
    const [error, user] = await to(
      User.findOne({
        where: { id: req.userId },
        select: ['firstName', 'lastName', 'email', 'createdAt'],
      })
    )
    if (error) res.statusInternalServerError('Não foi possível buscar usuário!')
    if (!user) {
      return res.statusNotFound('Usuário não encontrado')
    }

    const userInfo = {
      name: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    }

    return res.statusOk('Perfil encontrado com sucesso!', userInfo)
  }

  public async confirmEmail(req: Request, res: Response) {
    const token = String(req.query.token)

    const [error, user] = await to(
      User.findOneOrFail({ where: { confirmEmailToken: token } })
    )

    if (error) return res.statusBadRequest('Não foi possível buscar token.')
    if (!user) return res.statusBadRequest('Token não encontrada.')

    const tokenProps = jwt.verify(token, emailSecret)
    if (typeof tokenProps === 'string')
      return res.statusBadRequest('Não foi possível validar token.')

    if (Date.now() >= (tokenProps as any).exp * 1000) {
      return res.statusUnauthorized('Token Expirada!')
    }
    user.confirmedEmail = true
    user.confirmEmailToken = ''

    const [saveError] = await to(user.save())

    if (saveError)
      return res.statusInternalServerError('Não foi possível confirmar e-mail!')

    return res.statusOk('E-mail confirmado com sucesso!')
  }

  public async update(req: Request, res: Response) {
    // Deve receber um objeto com o _id e as novas informações
    if (!req.body._id) {
      return res.statusNotFound('Usuário não encontrado')
    }

    const seller = req.body
    delete seller._id

    const updatedData = await User.find({ id: req.body._id })

    return res.statusOk('Usuário editado com sucesso!')
  }

  public async delete(req: Request, res: Response) {
    const { sellerId } = req.body

    const [findError, user] = await to(User.findOne({ id: sellerId }))
    if (findError) res.statusInternalServerError('Erro ao procurar Usuário!')
    if (!user) res.statusNotFound('Usuário não encontrado!')

    return res.statusOk('Usuário deletado com sucesso!')
  }

  public async changeProfileType(req: Request, res: Response) {
    const { userId, profileType } = req
    const { type } = req.body

    if (!['common', 'corporate'].includes(type))
      return res.statusUnprocessableEntity('Tipo de perfil inválido!')

    if (profileType === type)
      return res.statusUnprocessableEntity(
        'Não é possível mudar para o mesmo tipo de perfil!'
      )

    const [findError, user] = await to(User.findOne({ id: userId }))

    if (findError)
      return res.statusInternalServerError('Não foi possível buscar usuário!')

    if (!user) return res.statusNotFound('Usuário não encontrado!')

    const isCommon = user.profileType === 'common'

    user.profileType = isCommon ? 'corporate' : 'common'

    const [saveError] = await to(user.save())

    if (saveError)
      return res.statusInternalServerError('Erro ao salvar usuário!')
    return res.statusOk('Tipo de usuário alterado com sucesso!', {
      needNewToken: true,
    })
  }
}

export default new UserController()
