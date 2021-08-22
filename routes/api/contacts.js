const express = require("express");
const router = express.Router();
const contactsOperations = require("../../model/contacts");
const { contactSchema, updateContactSchema } = require("../../validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(
      Number(contactId) || contactId
    );
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({ newContact });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(
      Number(contactId) || contactId
    );
    if (!deleteContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "contact deleted",
      code: 200,
      data: { deleteContact },
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(
      Number(contactId) || contactId,
      req.body
    );
    if (!updateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: { updateContact },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
