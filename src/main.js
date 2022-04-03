const app = require("./app")
const bodyparser = require("koa-bodyparser")

const config = require("./app/congfig")
const userRouter = require("./router/user.router")
const loginRouter = require("./router/login.router")
const momentRouter = require("./router/moment.router")
const commentRouter = require("./router/comment.router")
const labelRouter = require("./router/lable.router")
const fileRouter = require("./router/file.router")

require("./app/database")

app.use(bodyparser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())
app.use(labelRouter.routes())
app.use(labelRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`)
})