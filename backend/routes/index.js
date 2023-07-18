const router = require("express").Router();
const logout = require("./logout");
const userRoutes = require("./users");
const cardRoutes = require("./cards");
const loginRouter = require("./login");
const registerRouter = require("./register");

const { auth } = require("../middlewares/auth");

router.use("/", loginRouter);

router.use("/", registerRouter);

router.use(auth);

router.use("/", logout);

router.use("/users", userRoutes);

router.use("/cards", cardRoutes);

module.exports = router;
