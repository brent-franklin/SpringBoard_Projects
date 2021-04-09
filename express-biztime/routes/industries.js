const express = require("express");
const indRouter = express.Router();
const db = require("../db");

indRouter.get("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT i.code, i.industry, m.comp_code FROM industries i JOIN markets m ON i.code=m.ind_code`
    );
    const industryCode = [...new Set(results.rows.map((i) => i.code))];
    const markets = [
      ...results.rows.map((i) => [i.code, i.industry, i.comp_code]),
    ];
    const ind = {};
    for (let i = 0; i < industryCode.length; i++) {
      ind[industryCode[i]] = new Set();
      for (entry of markets) {
        if (entry[0] === industryCode[i]) {
          ind[industryCode[i]].add(entry[2]);
        }
      }
      ind[industryCode[i]] = [...ind[industryCode[i]]];
    }
    return res.json(ind);
  } catch (err) {
    return next(err);
  }
});

indRouter.get("/:code", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT i.industry, m.comp_code FROM industries i JOIN markets m ON i.code=m.ind_code WHERE i.code=$1`,
      [req.params.code]
    );
    return res.json({ industry: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

indRouter.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *`,
      [req.body.code, req.body.industry]
    );
    return res.json({ industry: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

module.exports = indRouter;
