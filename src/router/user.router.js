const Router = require("koa-router");

const {
  create,
  showAvatar
} = require("../controller/user.controller");

const {
  verifyUser,
  handlePassword
} = require("../middleware/user-middleware");

const userRouter = new Router({ prefix: "/user" });

// 创建用户
userRouter.post("/", verifyUser, handlePassword, create)
// 获取用户头像
userRouter.get("/:userId/avatar", showAvatar)


module.exports = userRouter