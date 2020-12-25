import { Router } from 'express'
import SessionController from '~/controllers/SessionController'

const sessionRoutes = Router()

// Login
sessionRoutes.post('/login', SessionController.login)

export default sessionRoutes
