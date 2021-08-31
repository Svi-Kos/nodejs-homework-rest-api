const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: "missing required name field" });
    // }
    const result = await Contact.create(req.body);
    res.status(201).json({ result });
  } catch (e) {
    e.status = 400;
    next(e);
  }
};

module.exports = addContact;
