import Validator from "../Validator"

const NAME_REGEX = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-Za-zàáâäãèéêëìíòóôöùúüūçÀÁÂÄÃÈÉÊËÌÍÒÓÔÖÙÚÜÇ.']\s*?)(?!.*[ ]$))+$/

class NameValidator extends Validator {
  validate(value?: string) {
    if (!value || !value.trim()) return this.empty
    const regex = new RegExp(NAME_REGEX)
    if (!regex.test(value) || value.length <= 1) return this.invalid
    return null
  }
}

export default NameValidator