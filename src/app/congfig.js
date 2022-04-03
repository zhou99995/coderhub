const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/private.key")
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./key/public.key"))

dotenv.config()

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
