const momentService = require("../service/moment.service")

class momentCotroller {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // 在数据库中插入数据
    const result = await momentService.insertContent(userId, content)
    ctx.body = result
    await next()
  }

  async getCommentById(ctx, next) {
    const id = ctx.params.momentId
    // 数据库中查询数据
    const result = await momentService.findCommetById(id)
    if (!result) {
      return ctx.body = "暂无动态~"
    }
    ctx.body = result

    await next()
  }

  async getCommentList(ctx, next) {
    const { offset, limit } = ctx.query
    const result = await momentService.findCommentList(offset, limit)
    ctx.body = result

    await next()
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const momentId = ctx.params.momentId
    const result = await momentService.update(momentId, content)
    ctx.body = result

    await next()
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    for (let label of labels) {
      //先判断是否有对应关系
      const isExits = await momentService.hasRecord(momentId, label.id)
      if (!isExits) {
        await momentService.addLabels(momentId, label.id)
      }
    }
    ctx.body = "插入标签成功~"
  }
}

module.exports = new momentCotroller()