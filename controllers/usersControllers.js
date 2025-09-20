const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
  //can also use nultiple try - catch to error handle individually
  try {
    //delete user
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, __v, ...others } = user._doc;
    return res.status(200).json({
      message: "successfully Found a User!",
      user: others,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "server error",
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  //can also use nultiple try - catch to error handle individually
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      //hash password
      if (req.body.password) {
        //change
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      //update password
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json({
        message: "successfully updated",
        user,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "server error",
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  //can also use nultiple try - catch to error handle individually
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      //delete user
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "successfully delete an account!",
      });
    } else {
      return res.status(403).json({
        message: "You cannot only delete your account!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "server error",
      error: e,
    });
  }
};

exports.follow = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      //find users
      const followingUser = await User.findById(req.params.id);
      if (!followingUser) return res.status(404).json("follow User not found");
      const currUser = await User.findById(req.body.userId);
      if (!currUser) return res.status(404).json("current User not found");
      //update follow/following
      await currUser.updateOne({ $push: { followings: req.params.id } });
      await followingUser.updateOne({ $push: { followers: req.body.userId } });

      //other way currUser.followers.push(id) currUser.save();

      return res.status(200).json({
        message: "successfully follow this user!",
      });
    } else {
      return res.status(403).json({
        message: "You cannot follow yourself!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "server error",
      error: e,
    });
  }
};

exports.unFollow = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      //find users
      const followingUser = await User.findById(req.params.id);
      if (!followingUser) return res.status(404).json("follow User not found");
      const currUser = await User.findById(req.body.userId);
      if (!currUser) return res.status(404).json("current User not found");
      //update follow/following
      await currUser.updateOne({ $pull: { followings: req.params.id } });
      await followingUser.updateOne({ $pull: { followers: req.body.userId } });

      //other way currUser.followers.remove(id) currUser.save();

      return res.status(200).json({
        message: "successfully unfollow this user!",
      });
    } else {
      return res.status(403).json({
        message: "You cannot unfollow yourself!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "server error",
      error: e,
    });
  }
};
