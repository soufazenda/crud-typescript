import Validator from "../Validator"

class slugValidator extends Validator {
  validate(value?: string) {
    if (!value || !value.trim()) return this.empty
    if (value.length <= 1) return this.invalid
    return null
  }
}

export default slugValidator