import { DateTime } from 'luxon'
var passwordStrength = require('password-validator')

const EMPTY_MESSAGE = 'Campo Obrigatório'
const INVALID_MESSAGE = 'Campo inválido'
const NAME_REGEX = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-Za-zàáâäãèéêëìíòóôöùúüūçÀÁÂÄÃÈÉÊËÌÍÒÓÔÖÙÚÜÇ.']\s*?)(?!.*[ ]$))+$/
const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2,})?$/

abstract class Validator {
  empty: string
  invalid: string
  constructor(empty?: string, invalid?: string) {
    this.empty = empty || EMPTY_MESSAGE
    this.invalid = invalid || INVALID_MESSAGE
  }
  abstract validate(value?: any): string | null
}

class NameValidator extends Validator {
  validate(value?: string) {
    if (!value || !value.trim()) return this.empty
    const regex = new RegExp(NAME_REGEX)
    if (!regex.test(value) || value.length <= 1) return this.invalid
    return null
  }
}

class AgeValidator extends Validator {
  validate(birthdate?: Date) {
    if (!birthdate) return this.empty
    if (
      typeof birthdate !== 'object' ||
      String(new Date(birthdate)) === 'Invalid Date'
    )
      return this.invalid
    console.log(new Date(birthdate))
    const age = Math.abs(DateTime.fromJSDate(birthdate).diffNow('years').years)
    if (age < 18 || age >= 120) return this.invalid
    return null
  }
}

class EmailValidator extends Validator {
  validate(email?: string) {
    if (!email || !email.trim()) return this.empty
    const regex = new RegExp(EMAIL_REGEX)
    if (!regex.test(email)) return this.invalid
    return null
  }
}

class PasswordValidator extends Validator {
  validate(password?: string) {
    if (!password || !password.trim()) return this.empty

    const schema = new passwordStrength()
    schema
      .is()
      .min(8)
      .is()
      .max(64)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .symbols(1)
      .has()
      .not()
      .spaces()

    if (!schema.validate(password)) return this.invalid

    return null
  }
}

class CPFValidator extends Validator {
  validate(cpf: string) {
    if (!cpf) return this.empty
    cpf = cpf.replace(/[\s.-]*/gim, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return this.invalid
    }
    var sum = 0
    var rest
    for (var i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    rest = (sum * 10) % 11
    if (rest == 10 || rest == 11) rest = 0
    if (rest != parseInt(cpf.substring(9, 10))) return this.invalid
    sum = 0
    for (var i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    rest = (sum * 10) % 11
    if (rest == 10 || rest == 11) rest = 0
    if (rest != parseInt(cpf.substring(10, 11))) return this.invalid
    return null
  }
}

export {
  CPFValidator,
  NameValidator,
  AgeValidator,
  EmailValidator,
  PasswordValidator,
  EMPTY_MESSAGE,
  INVALID_MESSAGE,
}
