const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ error: "Harap login terlebih dahulu" });
  }

  try {
    const decodedToken = await jwt.verify(accessToken, process.env.SECRET);
    req.role = decodedToken.role;
    req.id = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Harap login kembali" });
  }
};
