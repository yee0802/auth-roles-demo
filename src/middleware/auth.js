const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    return res.status(400).send({ error: "Missing auth token" });
  }

  const [_, token] = header.split(" ");

  try {
    const verifiedToken = jwt.verify(token, secret);

    const foundUser = users.find(
      (user) => user.username === verifiedToken.username
    );

    if (!foundUser) {
      return res
        .status(404)
        .send({ error: "No user found with username or password" });
    }

    delete foundUser.password;

    req.user = foundUser;

    next();
  } catch (e) {
    return res.status(400).send({ error: "Invalid credentials" });
  }
};

module.exports = {
  verifyToken,
};
