/** BizTime express application. */

const express = require("express");

const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

// Handle the routes for each company request
const cRoutes = require("./routes/companies");
app.use("/companies", cRoutes);

// Handle the routes for each invoice request
const iRoutes = require("./routes/invoices");
app.use("/invoices", iRoutes);

// Handle the routes for each invoice request
const indRoutes = require("./routes/industries");
app.use("/industries", indRoutes);

// Handle the routes for adding companies to markets
const mRoutes = require("./routes/markets");
app.use("/markets", mRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
