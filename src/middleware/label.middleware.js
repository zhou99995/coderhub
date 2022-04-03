const labelService = require("../service/label.service")

const verifyLabelExits = async (ctx, next) => {
  const { labels } = ctx.request.body
  // 检查这些label在不在标签表中,如果不在则添加
  const newLabel = []
  for (let name of labels) {
    const result = await labelService.getLabelByName(name)
    const label = { name }
    if (!result) {
      const res = await labelService.create(name)
      label.id = res.insertId
    } else {
      label.id = result.id
    }
    newLabel.push(label)
  }
  ctx.labels = newLabel
  await next()
}


module.exports = {
  verifyLabelExits
}