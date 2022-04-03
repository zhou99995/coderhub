const errorTypes = require("../constant/error-types")
const service = require("../service/user.service")
const md5password = require("../utils/md5password")

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 1.验证用户名密码是否为空
  if (!name || !password) {
    // ctx.body = new Error("name_or_password_is_empty ") + ""
    const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", err, ctx)
  }
  // 验证用户名是否重复
  const result = await service.getUserByname(name)
  if (result.length) {
    const err = new Error(errorTypes.NAME_IS_EIXTS)
    return ctx.app.emit("error", err, ctx)
  }
  // 没有错误在调用next
  await next()
}


const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next()
}



module.exports = {
  verifyUser,
  handlePassword
}