const fs = require("fs")
const { UPLOADS_AVATAR } = require("../constant/file-path")
const { create } = require("../service/user.service")
const fileService = require("../service/file.service")

class userController {
  async create(ctx, next) {
    // 查询数据库
    const result = await create(ctx.request.body)
    // 返回数据
    ctx.body = result

    await next()
  }

  async showAvatar(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarById(userId)
    ctx.response.set('content-type', avatarInfo.mimeType)
    ctx.body = fs.createReadStream(`${UPLOADS_AVATAR}/${avatarInfo.fileName}`)

    await next()
  }

}

module.exports = new userController()