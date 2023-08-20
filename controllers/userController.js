const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const update = await User.updateOne({ _id: req.params.userId });
      res.status(200).json(update);
      console.log(`Updated USER`);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const result = await User.deleteOne({ _id: req.params.userId });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (error) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  // add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate({ _id: req.params.userId, friends: req.params.friendId })
      console.log('Updated user friend list')
    } catch (error) {
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  // Delete a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate({ _id: req.params.userId, friends: req.params.friendId })
      console.log('Deleted friend from friend list')
    } catch (error) {
      res.status(500).json({ message: 'something went wrong' });
    }
  }
};