const { UPLOADS_AVATAR, UPLOADS_PICTURE } = require("../constant/file-path")
const multer = require("koa-multer")
const Jimp = require("jimp")

const avatarUpload = multer({
  dest: UPLOADS_AVATAR
})

const avatarHandle = avatarUpload.single('avatar')


const pictureUpload = multer({
  dest: UPLOADS_PICTURE
})

const pictureHande = pictureUpload.array("picture", 9)

// 设置图片的三种size
const resizePicture = async (ctx, next) => {
  try {
    const files = ctx.req.files
    for (file of files) {
      const url = `${UPLOADS_PICTURE}/${file.filename}`
      Jimp.read(url).then(image => {
        image.resize(1024, Jimp.AUTO).write(`${UPLOADS_PICTURE}/${file.filename}-large`)
        image.resize(680, Jimp.AUTO).write(`${UPLOADS_PICTURE}/${file.filename}-middle`)
        image.resize(340, Jimp.AUTO).write(`${UPLOADS_PICTURE}/${file.filename}-small`)
      })
    }

    await next()
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  avatarHandle,
  pictureHande,
  resizePicture
}