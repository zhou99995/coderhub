const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../app/congfig")

class loginController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id: id, name: name }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "2 days",
    })
    ctx.body = {
      id,
      name,
      token,
    }
    await next()
  }

  async success(ctx, next) {
    ctx.body = "授权成功"
  }
}

module.exports = new loginController()
