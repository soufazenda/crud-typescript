import {
  AgeValidator,
  NameValidator,
  EmailValidator,
  PasswordValidator,
  CPFValidator,
} from '@utils/validators'
import { INVALID_MESSAGE, EMPTY_MESSAGE } from '@utils/Validator'
import { DateTime } from 'luxon'

// Validator Tests: Age
test('Age should be OK', () => {
  const birthdate = new Date('11/08/1997')
  const validator = new AgeValidator()
  const result = validator.validate(birthdate)

  expect(result).toBe(null)
})

test('Age should be invalid for underage user', () => {
  const birthdate = DateTime.local().minus({ years: 12 }).toJSDate()
  const validator = new AgeValidator()
  const result = validator.validate(birthdate)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Age should be invalid for overage user', () => {
  const birthdate = DateTime.local().minus({ years: 120 }).toJSDate()
  const validator = new AgeValidator()
  const result = validator.validate(birthdate)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Age should be invalid for unespecified birthdate', () => {
  const validator = new AgeValidator()
  const result = validator.validate()

  expect(result).toBe(EMPTY_MESSAGE)
})

test('Age should be invalid for invalid Date', () => {
  const validator = new AgeValidator()
  const result = validator.validate(new Date('2020-19-20'))

  expect(result).toBe(INVALID_MESSAGE)
})

//Validators Tests: Name

test('Name should be OK', () => {
  const name = 'Gustavo'
  const validator = new NameValidator()
  const result = validator.validate(name)

  expect(result).toBe(null)
})

test('Name should be Invalid due to wrong characters', () => {
  const name = 'G¶stævo'
  const validator = new NameValidator()
  const result = validator.validate(name)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Name should be empty', () => {
  const name = ''
  const validator = new NameValidator()
  const result = validator.validate(name)

  expect(result).toBe(EMPTY_MESSAGE)
})

test('Name should be empty (but it has spaces)', () => {
  const name = '   '
  const validator = new NameValidator()
  const result = validator.validate(name)

  expect(result).toBe(EMPTY_MESSAGE)
})

test("Name should be invalid due to it's size", () => {
  const name = 'G'
  const validator = new NameValidator()
  const result = validator.validate(name)

  expect(result).toBe(INVALID_MESSAGE)
})

//Validators: email

test('Email should be OK', () => {
  const name = 'gustavogu12@hotmail.com'
  const validator = new EmailValidator()
  const result = validator.validate(name)

  expect(result).toBe(null)
})

test('Email with more subdomains should be OK', () => {
  const email = 'gustavogu12@gov.mk.com'
  const validator = new EmailValidator()
  const result = validator.validate(email)

  expect(result).toBe(null)
})

test('Email should be missing', () => {
  const email = ''
  const validator = new EmailValidator()
  const result = validator.validate(email)

  expect(result).toBe(EMPTY_MESSAGE)
})

test('Email should be Invalid due to wrong format (no account name)', () => {
  const email = '@mail.com'
  const validator = new EmailValidator()
  const result = validator.validate(email)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Email should be Invalid due to wrong format (no domain)', () => {
  const email = 'gustavogu12@'
  const validator = new EmailValidator()
  const result = validator.validate(email)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Email should be Invalid due to wrong format (missing @)', () => {
  const email = 'gustavogu122hotmail.com'
  const validator = new EmailValidator()
  const result = validator.validate(email)

  expect(result).toBe(INVALID_MESSAGE)
})

//Validators: Password

test('Password should be strong enough', () => {
  const password = 'Senha.Muito12Dificil'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(null)
})

test('Password should be missing', () => {
  const password = ''
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(EMPTY_MESSAGE)
})

test('Password should be invalid (too big)', () => {
  const password = 'senhasenhasenhasenhasenhasenhasenhasenhasenhasenhasenhasenhasenha'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be invalid (has Spaces)', () => {
  const password = 'Senha.Muito 12Dificil'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be weak (too small)', () => {
  const password = 'senha'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be weak (uppercase is missing)', () => {
  const password = 'senha.muito12dificil'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be weak (lowercase is missing)', () => {
  const password = 'SENHA.MUITO12DIFICIL'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be weak (symbol is missing)', () => {
  const password = 'SenhaMuito12Dificil'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})

test('Password should be weak (number is missing)', () => {
  const password = 'Senha.MuitoDificil'
  const validator = new PasswordValidator()
  const result = validator.validate(password)

  expect(result).toBe(INVALID_MESSAGE)
})


//Validators: CPF

test('CPF should be OK', () => {
  const cpf = '47096363890'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(null)
})

test('CPF should be OK (First 10 || 11 validator number)', () => {
  const cpf = '56941583002'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(null)
})

test('CPF should be OK (Second 10 || 11 validator number)', () => {
  const cpf = '21648733000'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(null)
})

test('CPF should be missing', () => {
  const cpf = ''
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(EMPTY_MESSAGE)
})

test('CPF should be invalid (Second validator number is wrong)', () => {
  const cpf = '47096363892'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(INVALID_MESSAGE)
})

test('CPF should be invalid (First validator number is wrong)', () => {
  const cpf = '47096363820'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(INVALID_MESSAGE)
})

test('CPF should be invalid (Repeted Number)', () => {
  const cpf = '11111111111'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(INVALID_MESSAGE)
})

test('CPF should be invalid', () => {
  const cpf = '47096363290'
  const validator = new CPFValidator()
  const result = validator.validate(cpf)

  expect(result).toBe(INVALID_MESSAGE)
})



