const express = require("express");
const { ExpressError } = require("./utilities");
const router = require("./routes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/items", router);

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// if nothing found then return 404 error
app.use((req, res, next) => {
  try {
    if (!res.body) {
      throw new ExpressError("Page Not Found", 404);
    }
  } catch (e) {
    next(e);
  }
});

// if error then handle and send back to user
app.use(function (err, req, res, next) {
  if (err) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let info = err.info || "Internal Server Error";
    let stack = err.stack;

    // set the status and alert the user
    if (req.headers.accept.includes("text/html")) {
      return res.send(`ERROR: ${info}\n${status}\n${stack}`);
    } else if (req.headers.accept.includes("application/json")) {
      return res.status(status).json({
        error: { info, status, stack },
      });
    }
  }
});

module.exports = app;
