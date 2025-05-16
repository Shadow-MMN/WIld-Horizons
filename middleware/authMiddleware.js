import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
}

export { verifyToken };
