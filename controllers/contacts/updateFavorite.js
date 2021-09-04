const { NotFound, BadRequest } = require("http-errors");
const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (favorite === undefined) {
    throw new BadRequest("missing field favorite");
  }
  if (!updateContact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateFavorite;
