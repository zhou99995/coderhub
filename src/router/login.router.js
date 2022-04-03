const Router = require("koa-router")
const loginRouter = new Router()

const { login, success } = require("../controller/login.controller")

const { verifyLogin, verifyAuth } = require("../middleware/login-middleware")

// 登录接口
loginRouter.post("/login", verifyLogin, login)
// 测试auth接口
loginRouter.get("/test", verifyAuth, success)

module.exports = loginRouter
