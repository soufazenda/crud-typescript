import './bootstrap'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router'
import { connectionString, dbName } from './configuration/env'
import easyResponse from './utils/simpleResponse'
import './database/index'
import 'reflect-metadata'
import { Mailer } from './mailer'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
    const mailer = new Mailer()
    // mailer.sendEmailConfirmation({
    //   to: 'gustavofelipe68@gmail.com',
    //   token: 'sdasdasadasdas',
    //   username: 'Gustavo Santana',
    // })
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(easyResponse)
    this.express.use(cors())
    this.express.use(
      morgan(':method :url :status :res[content-length] - :response-time ms')
    )
  }

  private routes(): void {
    this.express.use(router)
  }
}

export default new App().express
