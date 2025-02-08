import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, "KRMCTEST");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
