const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    // const { error } = updateContactSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({ message: "missing fields" });
    // }

    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
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
};

module.exports = updateContact;
