const UserService = require("../services/user.service");

module.exports = async (req, res, next) => {
  const userService = new UserService();
  try {
    const token = req.get('Authorization').replace('Bearer ', '');
    const user = await userService.isAuthenticated(token);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch(e) {
    res.status(401).send({ error: 'Token Invalid or Expired. Please login'})
  }
}
