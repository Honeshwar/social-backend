const Post = require("../models/Post");
const User = require("../models/User.js");

exports.create = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.get = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.userId === req.body.userId) {
      return res.status(200).json(post);
    } else {
      return res.status(403).json(post);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
exports.getAll = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.timeline = async (req, res) => {
  try {
    const currUser = await User.findById(req.params.userId);
    const userPost = await Post.find({ userId: req.params.userId });
    //user friends
    const friendPosts = await Promise.all(
      currUser.followings.length !== 0 &&
        currUser.followings.map((friendId) => {
          return Post.find({ userId: friendId }); //promise return array
        })
    );
    const allPosts = userPost.concat(...friendPosts); //usPost.push(...friendPosts)
    res.status(200).json(allPosts); //{...userPost, ...friendPosts}
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted...");
    } else {
      res.status(403).json("You can delete only your post...");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.userId === req.body.userId) {
      // gisna create ke ha only he/she can update
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated...");
    } else {
      res.status(403).json("You can update only your post...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found...");
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked...");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked...");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
