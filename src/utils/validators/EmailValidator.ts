import Validator from "../Validator"

const EMAIL_REGEX = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2,})?$/

export default class EmailValidator extends Validator {
  validate(email?: string) {
    if (!email || !email.trim()) return this.empty
    const regex = new RegExp(EMAIL_REGEX)
    if (!regex.test(email)) return this.invalid
    return null
  }
}