const crypto = require("crypto");

const md5password = (password) => {
  let md5 = crypto.createHash("md5");
  let res = md5.update(password).digest("hex");
  return res
}

module.exports = md5password