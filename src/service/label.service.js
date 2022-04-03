const connection = require("../app/database")

class labelService {
  async create(name) {
    const statement = `INSERT INTO labels(name) VALUES(?);`
    const [result] = await connection.execute(statement, [name])
    console.log(result);
    return result
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM labels WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }

  async list(offset, limit) {
    const statement = `SELECT * FROM labels LIMIT ?,?; `
    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }

  async getLabelsByMomentId(momentId) {
    try {
      const statement = `
      SELECT m.id id, m.content content,
        IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT("id",l.id,"name",l.name)),NULL)labels
        FROM moments m
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN labels l ON ml.label_id = l.id
        WHERE m.id = ?
        GROUP BY m.id;
    `
      const [result] = await connection.execute(statement, [momentId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new labelService()