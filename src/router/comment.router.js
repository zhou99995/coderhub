const Router = require("koa-router")
const { create, reply, update, remove } = require("../controller/comment.controller")
const { verifyAuth, verifyPermission } = require("../middleware/login-middleware")

const commentRouter = new Router({ prefix: "/comment" })
// 发布评论
commentRouter.post("/", verifyAuth, create)
// 回复评论
commentRouter.post("/:commentId/reply", verifyAuth, reply)
// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove)


module.exports = commentRouter