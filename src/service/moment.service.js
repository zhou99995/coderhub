const connections = require("../app/database")

class momnetService {
  async insertContent(userId, content) {
    const statement = `INSERT INTO moments(user_id,content) VALUES (?,?)`
    const [result] = await connections.execute(statement, [userId, content])
    return result
  }

  async findCommetById(id) {
    const statement = `
      SELECT m.id,m.content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl',u.avatarUrl) author,
        (SELECT IF(COUNT(*),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name,'avatarUrl',cu.avatarUrl))
        ),NULL) FROM comments c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) commentList,
        IF(COUNT(L.id),JSON_ARRAYAGG(
          JSON_OBJECT("id",l.id,"name",l.name)
        ),NULL) labels,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8088/moment/images/', file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moments m 
        LEFT JOIN users u ON u.id = m.user_id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN labels l ON l.id = ml.label_id
        WHERE m.id = ?
        GROUP BY m.id;
    `
    const [result] = await connections.execute(statement, [id])
    return result[0]
  }

  async findCommentList(offset, limit) {
    const statement = `
      SELECT m.id,m.content,m.createAt createTime,m.updateAt updateTime ,
        JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl',u.avatarUrl) author,
        (SELECT COUNT(*) FROM comments c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8088/moment/images/', file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moments AS m LEFT JOIN users AS u ON u.id = m.user_id 
        LIMIT ?,?;
    `
    const [result] = await connections.execute(statement, [offset, limit])
    return result
  }

  async update(momentId, content) {
    const statement = `UPDATE moments SET content = ? WHERE id = ?;`
    const [result] = await connections.execute(statement, [content, momentId])
    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moments WHERE id = ?;`
    const [result] = await connections.execute(statement, [momentId])
    return result
  }

  async hasRecord(momentId, labelId) {
    console.log(labelId, momentId);
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connections.execute(statement, [momentId, labelId])
    return result.length ? true : false
  }

  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label(moment_id,label_id) VALUES(?,?);`
    const [result] = await connections.execute(statement, [momentId, labelId])
    return result[0]
  }
}

module.exports = new momnetService()