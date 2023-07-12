const User = require("../models/user");
const NotFoundError = require("../errors/notFoundError");

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user._id;

  return User.findById(_id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(next);
};

const getUsersById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не существует");
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserById = (req, res, next) => {
  const newUserData = req.body;
  const { _id } = req.user;
  // console.log(new Error("NotValidId"));
  return User.findByIdAndUpdate(_id, newUserData, {
    new: true,
    runValidators: true
  })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatarById = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatarById,
  getCurrentUser
};
