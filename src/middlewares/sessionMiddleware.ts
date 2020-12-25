import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { appSecret } from '~/configuration/env'

interface DecodedToken {
  userId: string
  profileType: 'common' | 'corporate'
  iat: Number
  exp: Number
}

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization
  if (!token) return res.statusForbidden('Token não informada!')

  const tokenParts = token.split(' ')

  if (tokenParts[0] !== 'Bearer') return res.statusForbidden('Token Inválida!')

  try {
    const tokenVerification = jwt.verify(tokenParts[1], appSecret)
    if (typeof tokenVerification === 'string')
      return res.statusInternalServerError('Erro ao validar token!')

    const decodedToken = tokenVerification as DecodedToken

    req.profileType = decodedToken.profileType
    req.userId = decodedToken.userId

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      switch (err.message) {
        case 'jwt expired':
          return res.statusUnauthorized('Token Expirada!')
        default:
          return res.statusUnauthorized('Token Inválida!')
      }
    }
  }
}
