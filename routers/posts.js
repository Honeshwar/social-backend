const route = require("express").Router();
const postsController = require("../controllers/postsControllers");

route.post("/", postsController.create);
route.get("/", postsController.getAll); //get ALL
route.get("/:id", postsController.get); //get a post, we never get all post in app
route.get("/timeline/:userId", postsController.timeline); //unfollow post
route.delete("/:id", postsController.delete); //delete post
route.patch("/:id", postsController.update); //update post
route.patch("/:id/like", postsController.like); //follow post

module.exports = route;
