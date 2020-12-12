import { DateTime } from 'luxon'
var passwordStrength = require('password-validator');

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
    
    const schema = new passwordStrength();
    schema
      .is().min(8)
      .is().max(64)
      .has().uppercase()
      .has().lowercase()
      .has().digits(1)
      .has().symbols(1)
      .has().not().spaces();

    if(!schema.validate(password)) return this.invalid
    
    return null
  }
}

const validateCPF = (value: string) => {
  if (!value) return true
  if (value.split('.').length < 2) return true
  return false
}

export {
  validateCPF,
  NameValidator,
  AgeValidator,
  EmailValidator,
  PasswordValidator,
  EMPTY_MESSAGE,
  INVALID_MESSAGE,
}
