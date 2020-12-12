import { AgeValidator, EmailValidator, NameValidator, PasswordValidator } from './validators'

interface InvalidField {
  field: string
  message: string
}

const validate = (fields: Object): Array<InvalidField> => {
  const keys = Object.keys(fields)
  if (!keys.length) []

  const invalidFields: Array<InvalidField> = []
  keys.forEach((field, index) => {
    const message = validators[field].validate(fields[field])
    if (message?.length)
      invalidFields.push({ field, message: message } as InvalidField)
  })

  if (invalidFields?.length > 0) return invalidFields
  return []
}

const validators = {
  firstName: new NameValidator('Insira seu primeiro nome!', 'Nome inválido!'),
  lastName: new NameValidator('Insira seu sobrenome!', 'Sobrenome inválido!'),
  birthdate: new AgeValidator('Insira sua data de nascimento!', 'Data de nascimento inválida!'),
  email: new EmailValidator('Insira seu email!', 'Email inválido!'),
  password: new PasswordValidator('Insira sua Senha!', 'Senha inválida!'),
}

export default validate
