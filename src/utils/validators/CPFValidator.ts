import Validator from "../Validator"

export default class CPFValidator extends Validator {
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