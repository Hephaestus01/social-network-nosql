const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "This user id does not exist." });
        }
        res.json(userData);
      });
  },
  //   create user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //   update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "This user id does not exist." });
        }
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "This user id does not exist." });
        }
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "This user id does not exist." });
        }
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
