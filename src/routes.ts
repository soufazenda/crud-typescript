import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

const routes = Router()

routes.get('/users', UserController.index)

// CRUD User
routes.post('/user/create', UserController.create)
routes.get('/user', UserController.read)
routes.put('/user/update', UserController.update)
routes.delete('/user/delete', UserController.delete)

// TODO: Session routes
routes.get('/user/login', SessionController.login)

export default routes