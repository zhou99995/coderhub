const labelService = require("../service/label.service.js")

class labelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await labelService.create(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, limit } = ctx.query
    const result = await labelService.list(offset, limit)
    ctx.body = result

    await next()
  }

  async getLabelByMomentId(ctx, next) {
    const { momentId } = ctx.params
    const result = await labelService.getLabelsByMomentId(momentId)
    ctx.body = result

    await next()
  }
}

module.exports = new labelController()