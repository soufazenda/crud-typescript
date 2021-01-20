import { Router } from 'express'
import CompanyController from '~/controllers/CompanyController'
import { sessionMiddleware } from '~/middlewares/sessionMiddleware'

const companyRouter = Router()

// Create a new company
companyRouter.post('/', sessionMiddleware, CompanyController.create)

export default companyRouter
