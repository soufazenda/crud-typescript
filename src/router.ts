import { Router } from 'express'
import {companyRouter, sessionRouter, userRouter} from './routes'
import ProductController from './controllers/ProductController'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/companies', companyRouter)
routes.use(sessionRouter)


routes.get('/product', ProductController.read)

routes.post('/products/create', ProductController.create)

routes.put('/products/update', ProductController.update)

routes.delete('/products/delete', ProductController.delete)

routes.get('/products/list', ProductController.list)

export default routes
