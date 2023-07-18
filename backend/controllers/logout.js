const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).send({ message: "Вы вышли" });
};

module.exports = {
  logout,
};
