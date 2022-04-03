const sql = require("mysql2");
const config = require("./congfig");

const connections = sql.createPool({
  host:config.MYSQL_HOST,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_USER,
  port:config.MYSQL_PORT,
  password:config.MYSQL_PASSWORD
})

module.exports = connections.promise()
  