import { DateTime } from "luxon"
import Validator from "../Validator"

export default class AgeValidator extends Validator {
  validate(birthdate?: Date) {
    if (!birthdate) return this.empty
    const isInvalid = typeof birthdate !== 'object' || String(new Date(birthdate)) === 'Invalid Date'
    if (isInvalid)
      return this.invalid

    const age = Math.abs(DateTime.fromJSDate(birthdate).diffNow('years').years)
    if (age < 18 || age >= 120) return this.invalid
    return null
  }
}
