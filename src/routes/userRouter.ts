import { Router } from 'express'
import UserController from '@controllers/UserController'
import { sessionMiddleware } from '@middlewares/sessionMiddleware'

const userRouter = Router()

// TODO: User side..................................................................

// Listar todos os produtos do site por paginação

// Buscar produtos

// Visualizar perfil de um usuario
userRouter.get('/profile', sessionMiddleware, UserController.read)

// Visualizar perfil de uma empresa
userRouter.post('/', UserController.create)

/* /confirmation?token=<emailConfirmToken> */
userRouter.get('/confirmation', UserController.confirmEmail)

/* Atualiza o perfil para corporate ou common */
userRouter.patch('/profile/type', sessionMiddleware, UserController.changeProfileType)

// Entrar em contato com o vendedor (Email/Telefone) - Bull e nodemailer

// TODO: Company side (On session)..................................................

// Logon - Email de cadastro  com bull e nodemailer
userRouter.post('/seller/create', UserController.create)

// Profile
userRouter.put('/seller/update', UserController.update)

// Excluir conta
userRouter.delete('/seller/delete', UserController.delete)

// Admin Routes
userRouter.get('/list', UserController.index)

export default userRouter
