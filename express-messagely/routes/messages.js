const Router = require("express").Router;
const router = new Router();

const Message = require("../models/message");
const middleware = require("../middleware/auth");
const ExpressError = require("../expressError");


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", middleware.ensureLoggedIn,  async (req, res, next) => {
    try {
        const message = await Message.get(req.params.id);
        if ( req.user.username === message.from_user.username || req.user.username === message.to_user.username){
            return res.json(message);
        }
        throw new ExpressError("Unauthorized Access", 401);
    } catch (err) {
        return next(err);
    }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/:to_username", middleware.ensureLoggedIn, async (req, res, next) => {
    try {
    const to_username = req.params.to_username;
    const from_username = req.user.username;
    const body = req.body.msg;
    const message = await Message.create({from_username, to_username, body})
    return res.json(message)
    } catch (err) {
        return next(err);
    }
});


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.patch('/:id/read', middleware.ensureLoggedIn, async (req, res, next) => {
     try {
        const message = await Message.get(req.params.id);
        if (req.user.username === message.to_user.username){
            const { read_at } = await Message.markRead(message.id);
            message.read_at = read_at;

            return res.json(message);
        }
        throw new ExpressError("Unauthorized Access", 401);
    } catch (err) {
        return next(err);
    }
   
})


module.exports = router;