import { Request, Response } from 'express'
import to from 'await-to-js'
import validate from '@utils/validate'
import { CompanyRepository } from '~/repositories/CompanyRepository'
import { getCustomRepository, SelectQueryBuilder } from 'typeorm'
import Company from '@models/Company'
import User from '~/models/User'

class CompanyController {
  public async create(req: Request, res: Response) {
    if (req.profileType == 'common')
      return res.statusForbidden(
        'Você não pode criar uma Loja com perfil comum!'
      )
    
    const [findUserError, user] = await to(User.findOneOrFail(req.userId))

    if(findUserError) return res.statusInternalServerError("Não foi possível buscar usuário!")
    if(!user) return res.statusNotFound("Usuário não encontrado!")
    console.log(user)
    if(user.company) return res.statusConflict("Usuário já possui loja!")

    const { cnpj, name, slug, description } = req.body

    const invalidFields = validate({ cnpj, name: {value: name, as: 'companyName' }, slug })
    if (invalidFields != null)
      return res.statusUnprocessableEntity('Campos Inválidos', invalidFields)

    const companyRepository = getCustomRepository(CompanyRepository)

    const [err, company] = await to(companyRepository.findBySlug('test'))
    if(!err) console.log(company)
    if(company) {
      console.log(company)
      return res.statusConflict('Já existe uma loja com este slug!')
    }
    const newCompany = new Company()

    newCompany.cnpj = cnpj
    newCompany.name = name
    newCompany.slug = slug
    newCompany.description = description

    const [newCompanyErr, response] = await to(newCompany.save())

    console.log(newCompanyErr)
    if(newCompanyErr) return res.statusInternalServerError("Não foi possível criar loja!")

    return res.statusCreated("Loja criada com sucesso!")
  }
}

export default new CompanyController()
