const Router = require("koa-router")

const { verifyAuth } = require("../middleware/login-middleware")

const { saveAvatarInfo, savaPictureInfo } = require("../controller/file.controller.js")

const { avatarHandle, pictureHande, resizePicture } = require("../middleware/file.middleware")

const fileRouter = new Router({ prefix: "/upload" })

// 上传头像[保存头像、保存头像信息到数据库]
fileRouter.post("/avatar", verifyAuth, avatarHandle, saveAvatarInfo)
// 上传动态的配图 [添加对图片的large,middle,small中间件的处理]
fileRouter.post("/picture", verifyAuth, pictureHande, resizePicture, savaPictureInfo)


module.exports = fileRouter