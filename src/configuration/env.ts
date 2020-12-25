import ip from 'ip'
import dotenv from 'dotenv'

const env = process.env.NODE_ENV
const isProduction = env === 'production'

dotenv.config({
  path: env === '' ? '.env' : `.env.${env}`,
})

const dbUser = String(process.env.DB_USER)
const dbName = String(process.env.DB_NAME)
const dbPassword = String(process.env.DB_PASSWORD)
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@basic.ufxzo.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
const port = String(process.env.PORT)
const appSecret = String(process.env.APP_SECRET)
const emailSecret = String(process.env.EMAIL_SECRET)
const url = isProduction
  ? String(process.env.URL)
  : `http://${ip.address()}:${port}`

const tokenDuration = '2m'

export {
  env,
  url,
  port,
  dbUser,
  dbName,
  appSecret,
  dbPassword,
  emailSecret,
  tokenDuration,
  connectionString,
}
