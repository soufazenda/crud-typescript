import "./bootstrap"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
import routes from "./routes"
import { connectionString, dbName } from "./utils/config"
import easyResponse from "./utils/simpleResponse"

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(easyResponse)
    this.express.use(cors())
    this.express.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    )
  }

  private database(): void {
    console.log("Connecting to:", dbName, "database...")
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Successfully Connected!"))
      .catch((err) =>
        console.error("Error while trying to connect to database!", err)
      )
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
