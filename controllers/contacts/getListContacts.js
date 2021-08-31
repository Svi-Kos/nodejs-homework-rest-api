const contactsOperations = require("../../model/contacts");

const getListContacts = async (req, res, next) => {
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
};

module.exports = getListContacts;
