import 'reflect-metadata'
import { createConnection } from 'typeorm'
import User from './models/User'

createConnection()
  .then(() => {
    console.log('Connected to database!')
  })
  .catch((error) => console.log(error))
