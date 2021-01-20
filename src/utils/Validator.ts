export const EMPTY_MESSAGE = 'Campo Obrigatório'
export const INVALID_MESSAGE = 'Campo inválido'

abstract class Validator {
  empty: string
  invalid: string
  constructor(empty?: string, invalid?: string) {
    this.empty = empty || EMPTY_MESSAGE
    this.invalid = invalid || INVALID_MESSAGE
  }
  abstract validate(value?: any): string | null
}

export default Validator