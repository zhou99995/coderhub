const connection = require("../app/database")

class fileService {
  async saveAvatarInfo(filename, mimetype, size, userId) {
    try {
      const statement = `INSERT INTO avatar(fileName,mimeType,size,user_id) VALUE(?,?,?,?);`
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async getAvatarById(userId) {
    try {
      const statement = `SELECT * FROM avatar WHERE user_id = ?`
      const [result] = await connection.execute(statement, [userId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async saveAvatarUrlById(id, avatarUrl) {
    try {
      const statement = `UPDATE users SET avatarUrl=? WHERE id = ?`
      const [result] = await connection.execute(statement, [avatarUrl, id])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async savePictureInfo(filename, mimetype, size, momentId, userId) {
    try {
      const statement = `INSERT INTO file(filename,mimetype,size,moment_id,user_id) VALUES(?,?,?,?,?);`
      const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, userId])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async getFileByFilename(filename) {
    try {
      const statement = `SELECT * FROM file WHERE filename = ?;`
      const [result] = await connection.execute(statement, [filename])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new fileService()