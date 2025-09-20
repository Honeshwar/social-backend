const route = require("express").Router();

route.use("/api/users",require('./users.js'))
route.use("/api/auth",require('./auth.js'))
route.use("/api/posts",require('./posts.js'))
module.exports = route;