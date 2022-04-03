const Koa = require("koa");
const errorHandle = require("./error-handle");

const app = new Koa();
app.on("error",errorHandle);

module.exports = app
