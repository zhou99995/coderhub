const connections = require("../app/database")


class userService {
  async create(user) {
    const { name, password } = user
    const statement = `
      INSERT INTO users (name,password) VALUES (?,?)
    `
    const result = await connections.execute(statement, [name, password])
    console.log("将用户存储到数据中", user)

    return result
  }

  async getUserByname(name) {
    try {
      const statement = `SELECT * FROM users WHERE name = ?`
      const result = await connections.execute(statement, [name])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async check(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connections.execute(statement, [id, userId])
    return (result.length ? true : false)
  }
}

module.exports = new userService()
