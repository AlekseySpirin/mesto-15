const { verifyToken, decryptToken } = require("../utils/jwt");
const User = require("../models/user");
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!verifyToken(token)) {
    const error = new Error("Нет доступа");
    error.statusCode = 401;
    return next(error);
  }
  const userId = decryptToken(token);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Пользователь не найден");
        error.statusCode = 404;
        throw error;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  auth
};
