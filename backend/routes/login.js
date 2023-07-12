const router = require("express").Router();

const { login } = require("../controllers/login");

const { createUserValidator } = require("../validation/validationRules");

router.post("/signin", createUserValidator, login);

module.exports = router;
