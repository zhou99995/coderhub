const Router = require("koa-router")
const { create, getCommentById, getCommentList, update, remove, addLabels } = require("../controller/moment.controller")
const { showPicture } = require("../controller/file.controller")
const { verifyAuth, verifyPermission } = require("../middleware/login-middleware")
const { verifyLabelExits } = require("../middleware/label.middleware.js")

const momentRouter = new Router({ prefix: "/moment" })

// 动态接口 
momentRouter.post("/", verifyAuth, create)
// 查询单条动态接口
momentRouter.get("/:momentId", getCommentById)
// 查询所有动态接口
momentRouter.get("/", getCommentList)
// 更新用户动态接口(1.验证登录 2.删除自己的comment)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update)
// 删除用户动态接口
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove)
// 给动态添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExits, addLabels)
// 获取动态的配图
momentRouter.get("/images/:filename", showPicture)

module.exports = momentRouter