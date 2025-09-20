const route = require("express").Router();
const userController = require("../controllers/usersControllers");

route.get("/:id",userController.get)//get a user, we never get all user in app
route.delete("/:id",userController.delete) //delete user
route.patch("/:id",userController.update) //update user
route.patch("/:id/follow",userController.follow) //follow user
route.patch("/:id/unfollow",userController.unFollow) //unfollow user

module.exports = route; 