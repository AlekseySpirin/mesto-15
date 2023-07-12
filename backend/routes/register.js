const router = require("express").Router();

const { createUser } = require("../controllers/register");

const { createUserValidator } = require("../validation/validationRules");

router.post("/signup", createUserValidator, createUser);

module.exports = router;
