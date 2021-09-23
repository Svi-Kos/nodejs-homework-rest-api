const { NotFound } = require("http-errors");
const { User } = require("../../models");

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound("User not found");
  }
  const userId = user._id.toString();
  await User.findByIdAndUpdate(userId, { verifyToken: null, verify: true });
  res.status(200).json({
    status: "Confirmed",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
