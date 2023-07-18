const { isCelebrateError } = require("celebrate");

const celebrateError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errors =
      err.details && (err.details.get("body") || err.details.get("params"));
    const message = errors ? errors.get("message").message : "Неверные данные";
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = {
  celebrateError,
};
