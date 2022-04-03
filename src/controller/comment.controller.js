const commentService = require("../service/comment.service")

class commentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.create(momentId, content, id)
    ctx.body = result

    await next()
  }

  async reply(ctx, next) {
    const commentId = ctx.params.commentId
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.reply(momentId, content, id, commentId)
    ctx.body = result

    await next()
  }

  async update(ctx, next) {
    const commentId = ctx.params.commentId
    const { content } = ctx.request.body
    const result = await commentService.update(commentId, content)
    ctx.body = result

    await next()
  }

  async remove(ctx, next) {
    const commentId = ctx.params.commentId
    const result = await commentService.remove(commentId)
    ctx.body = result

    await next()
  }
}

module.exports = new commentController()