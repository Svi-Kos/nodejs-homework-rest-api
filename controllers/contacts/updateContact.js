const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateContact;
