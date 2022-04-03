const errorTypes = require("../constant/error-types")

const errorHandle = (err, ctx) => {
  let status, message
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      message = "用户名或者密码不能为空~"
      break
    case errorTypes.NAME_IS_EIXTS:
      status = 409
      message = "用户名已经存在~"
      break
    case errorTypes.NAME_DOES_NOT_EXITS:
      status = 400
      message = "用户名错误~"
      break
    case errorTypes.PASSWORD_IS_EEROR:
      status = 400
      message = "密码错误~"
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = "未授权"
      break
    default:
      status = 404
      message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle
