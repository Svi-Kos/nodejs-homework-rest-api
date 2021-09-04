const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const reg = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
      status: "Created",
      code: 201,
      data: result,
      message: "success register",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = reg;
