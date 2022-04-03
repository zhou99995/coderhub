const Router = require("koa-router")

const { verifyAuth } = require("../middleware/login-middleware")
const { create, list, getLabelByMomentId } = require("../controller/label.controller.js")

const labelRouter = new Router({ prefix: "/label" })

// 创建标签接口
labelRouter.post("/", verifyAuth, create)
// 获取标签
labelRouter.get("/", list)
// 根据momentId获取标签
labelRouter.get("/:momentId", verifyAuth, getLabelByMomentId)

module.exports = labelRouter