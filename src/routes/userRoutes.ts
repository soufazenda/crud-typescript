import { Router } from 'express'
import UserController from '@controllers/UserController'
import { sessionMiddleware } from '@middlewares/sessionMiddleware'

const userRoutes = Router()

// TODO: User side..................................................................

// Listar todos os produtos do site por paginação

// Buscar produtos

// Visualizar perfil de um usuario
userRoutes.get('/profile', sessionMiddleware, UserController.read)

// Visualizar perfil de uma empresa
userRoutes.post('/', UserController.create)

/* /confirmation?token=<emailConfirmToken> */
userRoutes.get('/confirmation', UserController.confirmEmail)

// Entrar em contato com o vendedor (Email/Telefone) - Bull e nodemailer

// TODO: Company side (On session)..................................................

// Logon - Email de cadastro  com bull e nodemailer
userRoutes.post('/seller/create', UserController.create)

// Profile
userRoutes.put('/seller/update', UserController.update)

// Excluir conta
userRoutes.delete('/seller/delete', UserController.delete)

// Admin Routes
userRoutes.get('/list', UserController.index)

export default userRoutes
