const route = require("express").Router();
const authContollers = require('../controllers/authControllers')
route.post("/register",authContollers.register)
route.post("/signin",authContollers.signin)
module.exports = route;