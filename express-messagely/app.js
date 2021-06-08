/** Express app for message.ly. */

const express = require("express");
const nunjucks = require("nunjucks");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");

const ExpressError = require("./expressError");
const app = express();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add express app to nunjucks to initiate templating engine
app.set("view engine", "html");
nunjucks.configure(["./dist/views/pages/"], {
  autoescape: true,
  express: app,
});

// serve static files for style and client-side scripts
app.use(express.static("dist/static"));

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

/** GET /login - login template
 *
 * Make sure all fields are filled out properly
 *
 **/

app.get("/", function (req, res, next) {
  return res.render("landing.html");
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  if (!res) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
  }
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
