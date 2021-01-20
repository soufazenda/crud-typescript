import { Router } from 'express'
import SessionController from '~/controllers/SessionController'

const sessionRouter = Router()

// Login
sessionRouter.post('/login', SessionController.login)

export default sessionRouter
