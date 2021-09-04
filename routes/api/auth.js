const express = require("express");

const { joiSchema } = require("../../models/user");
const { validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/signup", userValidationMiddleware, ctrl.reg);

router.post("/login", userValidationMiddleware, ctrl.login);

// router.get("/logout", ctrl.logout);

module.exports = router;
