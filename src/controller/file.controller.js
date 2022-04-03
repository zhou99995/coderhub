const path = require("path")
const fs = require("fs")
const fileService = require("../service/file.service.js")
const { APP_PORT } = require("../app/congfig")
const { UPLOADS_PICTURE } = require("../constant/file-path")

class fileController {
  async saveAvatarInfo(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file
    // 这个文件的扩展名，可以在直接下载的时候跟在后面
    // const extname = path.extname(ctx.req.file.originalname)
    const { id } = ctx.user
    await fileService.saveAvatarInfo(filename, mimetype, size, id)
    const avatarUrl = `http://localhost:${APP_PORT}/user/${id}/avatar`
    await fileService.saveAvatarUrlById(id, avatarUrl)
    ctx.body = "上传头像成功~"

    await next()
  }

  async savaPictureInfo(ctx, next) {
    try {
      const files = ctx.req.files
      const { momentId } = ctx.query
      const { id } = ctx.user
      for (let file of files) {
        const { mimetype, filename, size } = file
        // 将图片信息保存到数据库
        await fileService.savePictureInfo(filename, mimetype, size, momentId, id)
      }
      ctx.body = "动态图片上传成功~"

      await next()
    } catch (error) {
      console.log(error);
    }
  }

  async showPicture(ctx, next) {
    const { filename } = ctx.params
    // 根据上传的图片，选择对应的大小
    const { type } = ctx.query
    const size = ['small', 'middle', 'large']
    const result = await fileService.getFileByFilename(filename)
    ctx.response.set("content-type", result.mimetype)
    // const res = size.some(item => item === type)
    // ctx.body = fs.createReadStream(`${UPLOADS_PICTURE}/${result.filename}-middle`)
    if (size.some(item => item === type)) { //根据传入的type决定给客户端返回的大小
      ctx.body = fs.createReadStream(`${UPLOADS_PICTURE}/${result.filename}-${type}`)
    } else {  //返回原图
      ctx.body = fs.createReadStream(`${UPLOADS_PICTURE}/${result.filename}`)
    }

    await next()
  }
}

module.exports = new fileController