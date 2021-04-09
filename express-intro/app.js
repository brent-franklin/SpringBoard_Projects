const express = require("express");
const { meanFunc, medianFunc, modeFunc, writeToFile } = require("./stats");
const { ExpressError } = require("./errorHandlers");
const fs = require("fs");
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log("Welcome!");
  return res.send("Welcome!");
});

app.get("/mean", function (req, res, next) {
  try {
    if (!req.query.nums)
      throw new ExpressError(
        `Bad Request - Query string is empty, Example: www.example.com/mean?nums=1,2,3`,
        400
      );
    if (req.query.save) writeToFile("mean", req.query.nums);
    if (req.headers.accept.split(",")[0] === "text/html") {
      return res.send(`Operation: Mean, Mean: ${meanFunc(req.query.nums)}`);
    } else if (req.headers.accept.split(",")[0] === "application/json") {
      return res.json({
        response: {
          operation: "mean",
          value: meanFunc(req.query.nums),
        },
      });
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, res, next) => {
  try {
    if (!req.query.nums)
      throw new ExpressError(
        `Bad Request - Query string is empty, Example: www.example.com/median?nums=1,2,3`,
        400
      );
    if (req.query.save) writeToFile("median", req.query.nums);
    if (req.headers.accept.split(",")[0] === "text/html") {
      return res.send(
        `Operation: Median, Median: ${medianFunc(req.query.nums)}`
      );
    } else if (req.headers.accept.split(",")[0] === "application/json") {
      return res.json({
        response: {
          operation: "median",
          value: medianFunc(req.query.nums),
        },
      });
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    if (!req.query.nums)
      throw new ExpressError(
        `Bad Request - Query string is empty, Example: www.example.com/mode?nums=1,2,2,3`,
        400
      );
    if (req.query.save) writeToFile("mode", req.query.nums);
    if (req.headers.accept.split(",")[0] === "text/html") {
      return res.send(`Operation: Mode, Mode: ${modeFunc(req.query.nums)}`);
    } else if (req.headers.accept.split(",")[0] === "application/json") {
      return res.json({
        response: {
          operation: "mode",
          value: modeFunc(req.query.nums),
        },
      });
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/all", (req, res, next) => {
  try {
    if (!req.query.nums)
      throw new ExpressError(
        `Bad Request - Query string is empty, Example: www.example.com/mode?all=1,2,2,3`,
        400
      );

    if (req.query.save) writeToFile("all", req.query.nums);
    if (req.headers.accept.split(",")[0] === "text/html") {
      return res.send(`Operation: All, 
      Mean: ${meanFunc(req.query.nums)}, 
      Median: ${medianFunc(req.query.nums)}, 
      Mode: ${modeFunc(req.query.nums)}`);
    } else if (req.headers.accept.split(",")[0] === "application/json") {
      return res.json({
        response: {
          operation: "all",
          mean: meanFunc(req.query.nums),
          median: medianFunc(req.query.nums),
          mode: modeFunc(req.query.nums),
        },
      });
    }
  } catch (err) {
    return next(err);
  }
});

app.use(function (req, res, next) {
  if (!res) {
    const err = new ExpressError("Page Not Found", 404);
    return next(err);
  }
});

app.use(function (err, req, res, next) {
  if (err) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let info = err.info || "Internal Server Error";
    let stack = err.stack;

    // set the status and alert the user
    if (req.headers.accept.split(",")[0] === "text/html") {
      return res.send(`ERROR: ${info}\n${status}\n${stack}`);
    } else if (req.headers.accept.split(",")[0] === "application/json") {
      return res.status(status).json({
        error: { info, status, stack },
      });
    }
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000!");
});
