const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden - Insufficient role" });
    }
    next();
  };
};

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden - Role not allowed" });
    }
    next();
  };
};

module.exports = {
  verifyRole,
  allowRoles
};
