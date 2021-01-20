import Validator from "../Validator"

var passwordStrength = require('password-validator')

export default class PasswordValidator extends Validator {
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