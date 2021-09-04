const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) {
    throw new NotFound("Not found");
  }
  res.json({
    message: "contact deleted",
    code: 200,
    data: { deleteContact },
  });
};

module.exports = removeContact;
