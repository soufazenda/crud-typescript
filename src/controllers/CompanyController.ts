import { Request, Response } from 'express'
import User from '../models/User'
import to from 'await-to-js'
import validate from '~/utils/validate'

class CompanyController {
  public async create(req: Request, res: Response) {
    if (req.profileType == 'common')
      return res.statusForbidden(
        'Você não pode criar uma Loja com perfil comum!'
      )
    const { cnpj, name, slug, description } = req.body

    const invalidFields = validate({ cnpj, name, slug, description })
    if (invalidFields != null)
      return res.statusUnprocessableEntity('Campos Inválidos', invalidFields)
  }
}

export default new CompanyController()
