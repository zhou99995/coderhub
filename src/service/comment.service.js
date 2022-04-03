const connections = require("../app/database")

class commentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comments(content,moment_id,user_id) VALUES(?,?,?);`
    const [result] = await connections.execute(statement, [content, momentId, userId])
    return result
  }

  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comments(content,moment_id,user_id,comment_id) VALUES(?,?,?,?);`
    const [result] = await connections.execute(statement, [content, momentId, userId, commentId])
    return result
  }

  async update(commentId, content) {
    const statement = `UPDATE comments SET content = ? WHERE id = ?;`
    const [result] = await connections.execute(statement, [content, commentId])
    return result
  }

  async remove(commentId) {
    const statement = `DELETE FROM comments WHERE id = ?;`
    const [result] = await connections.execute(statement, [commentId])
    return result
  }
}

module.exports = new commentService()