import dotenv from 'dotenv';

const env = process.env.NODE_ENV

dotenv.config({
  path: env === '' ? '.env' : `.env.${env}`,
});

const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@basic.ufxzo.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
const port = process.env.PORT
const appSecret = process.env.APP_SECRET

export {
  env,
  port,
  dbUser,
  dbName,
  appSecret,
  dbPassword,
  connectionString
}