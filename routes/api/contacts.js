const express = require("express");
const router = express.Router();
const { joiContactSchema } = require("../../models/contact");
const { validation, controllerWrapper } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const validationMiddleware = validation(joiContactSchema);

router.get("/", ctrl.getListContacts);

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validationMiddleware, ctrl.addContact);

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validationMiddleware,
  controllerWrapper(ctrl.updateContact)
);

router.patch("/:contactId/favorite", controllerWrapper(ctrl.updateFavorite));

module.exports = router;
