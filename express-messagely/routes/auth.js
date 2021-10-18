const Router = require('express').Router;
const router = new Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('../config');
const { BadRequestError } = require('../expressError');

/** GET /login - login template
 *
 * Make sure all feilds are filled out properly
 *
 **/

router.get('/login', function (req, res, next) {
  return res.render('login.html');
});

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async function (req, res, next) {
  try {
    let { username, password } = req.body;
    if (await User.authenticate(username, password)) {
      let token = jwt.sign({ username }, SECRET_KEY);
      let rToken = jwt.sign(`r${{ username }}`, SECRET_KEY);
      User.updateLoginTimestamp(username);
      res.cookie('t1', { rToken }, { maxAge: 1000, httpOnly: true, secure: true, sameSite: true });
      return res.json({ token });
    }
    throw new BadRequestError();
  } catch (err) {
    return next(err);
  }
});

/** GET /register - register template
 *
 * Make sure all feilds are filled out properly
 *
 **/

router.get('/register', function (req, res, next) {
  return res.render('register.html');
});

/** POST /register - register user: registers, logs in, and returns token.
 * 
 - 1. Add new user with unique username to db 
   User.register => 

 - 2. Return JS obj of new user 
   User object => 

 - 3. Destructure username from object 
   {username} => 

 - 4. Create jwt from unique username
   {token}
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async function (req, res, next) {
  try {
    let { username } = await User.register(req.body);
    let token = jwt.sign({ username }, SECRET_KEY);
    let rToken = jwt.sign(`r${{ username }}`, SECRET_KEY);
    User.updateLoginTimestamp(username);
    res.cookie('t1', { rToken }, { maxAge: 1000, httpOnly: true, secure: true, sameSite: true });
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
