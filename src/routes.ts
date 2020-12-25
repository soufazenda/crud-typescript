import { Router } from 'express'
import userRoutes from './routes/userRoutes'
import sessionRoutes from './routes/sessionRoutes'
import ProductController from './controllers/ProductController'

const routes = Router()

routes.use('/users', userRoutes)
routes.use(sessionRoutes)

routes.get('/product', ProductController.read)

routes.post('/products/create', ProductController.create)

routes.put('/products/update', ProductController.update)

routes.delete('/products/delete', ProductController.delete)

routes.get('/products/list', ProductController.list)

export default routes
