const errorTypes = require("../constant/error-types")
const service = require("../service/user.service")
const md5password = require("../utils/md5password")
const jwt = require("jsonwebtoken")
const { PUBLIC_KEY } = require("../app/congfig")

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 1.验证用户名密码是否为空
  if (!name || !password) {
    const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", err, ctx)
  }
  // 2.验证用户名（数据库中设计name是唯一的 ）
  const result = await service.getUserByname(name)
  const user = result[0]
  if (user == undefined) {
    const err = new Error(errorTypes.NAME_DOES_NOT_EXITS)
    return ctx.app.emit("error", err, ctx)
  }
  // 4.验证密码是否正确
  if (user.password != md5password(password)) {
    const err = new Error(errorTypes.PASSWORD_IS_EEROR)
    return ctx.app.emit("error", err, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return (ctx.app.emit("error", error, ctx))
  }
  const token = authorization.replace("Bearer ", "")
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit("error", error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params)
  const resourceName = resourceKey.replace("Id", "") + "s"  //获取数据库表名
  const { id } = ctx.user   //获取用户id
  const resourceId = ctx.params[resourceKey]    //获取comment中的id
  // 根据momentId比对userId   数据库比对  
  try {
    const isPermission = await service.check(resourceName, resourceId, id)
    if (!isPermission) throw new Error()
    await next()
  } catch (error) {
    const err = new Error(errorTypes.UNPERMISSION)
    ctx.app.emit("error", err, ctx)
  }
}


module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
