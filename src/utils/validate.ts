import Validator from "./Validator";
import { NameValidator, EmailValidator, AgeValidator, CPFValidator, PasswordValidator } from "./validators"
import CNPJValidator from "./validators/CNPJValidator"
import CompanyNameValidator from "./validators/CompanyNameValidator"
import slugValidator from "./validators/SlugValidator"
interface InvalidField {
  field: string
  message: string
}

interface ConfigurableValue {
  value: any
  as: string
}

function isConfigurableValue(object: any): object is ConfigurableValue {
  return 'value' in object && 'as' in object;
}


const validate = (fields: Object): Array<InvalidField> | null => {
  const keys = Object.keys(fields)
  if (!keys.length) []

  const invalidFields: Array<InvalidField> = []
  keys.forEach((field, index) => {
    const selectedField = fields[field]
    let validator: Validator
    let value: any

    if(typeof selectedField === 'object' && isConfigurableValue(selectedField)){
      validator = validators[selectedField.as]
      value = selectedField.value
    }else{
      validator = validators[field]
      value = fields[field]
    }

    if (validator) {
      const message = validator.validate(value)
      
      if (message?.length)
        invalidFields.push({ field, message: message } as InvalidField)
    } else {
      console.warn('No validators found for: ', field)
    }
  })

  if (invalidFields?.length > 0) return invalidFields
  return null
}

const validators = {
  firstName: new NameValidator('Insira seu primeiro nome!', 'Nome inválido!'),
  lastName: new NameValidator('Insira seu sobrenome!', 'Sobrenome inválido!'),
  birthdate: new AgeValidator(
    'Insira sua data de nascimento!',
    'Data de nascimento inválida!'
  ),
  email: new EmailValidator('Insira seu email!', 'Email inválido!'),
  password: new PasswordValidator('Insira sua Senha!', 'Senha inválida!'),
  cpf: new CPFValidator('Insira seu CPF', 'CPF inválido!'),
  cnpj: new CNPJValidator('Insira seu CNPJ', 'CNPJ inválido!'),
  companyName: new CompanyNameValidator('Insira o Nome da sua loja', 'Nome inválido!'),
  slug: new slugValidator('Insira uma Slug', 'Slug inválida!'),
}

export default validate
