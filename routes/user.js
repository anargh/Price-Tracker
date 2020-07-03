const router = require('express').Router();

const UserService = require('../services/user');
const User = require('../models/user');
const auth = require('../middleware/auth');

const userService = new UserService();

router.post('/register', async (req, res) => {
  let user;
  try {
    const registerUser = new User(req.body)
    user = await userService.register(registerUser);
  } catch(e) {
    res.status(500).send({ error: e.message });
  }
  res.status(201).send(user)
});

router.post('/login', async (req, res) => {
  let token;
  try {
    token = await userService.login(req.body.email, req.body.password);
  } catch(e) {
    res.status(401).send({ error: e.message });
  }
  res.send(token);
});

router.get('/profile', auth, (req, res) => {
  const { name, email } = req.user;
  res.send({ name, email});
});

module.exports = router;