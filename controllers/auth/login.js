const bcrypt = require("bcryptjs");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);

  if (!compareResult) {
    throw new Unauthorized("Email or password is wrong");
  }

  const token = "kjhhbbukhukbkjbjbju";
  res.json({ token });
};

module.exports = login;
