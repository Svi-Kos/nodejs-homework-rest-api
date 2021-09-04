const express = require("express");

const { joiSchema } = require("../../models/user");
const { validation, controllerWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/signup", userValidationMiddleware, controllerWrapper(ctrl.reg));

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

// router.get("/logout", controllerWrapper(ctrl.logout));

module.exports = router;
