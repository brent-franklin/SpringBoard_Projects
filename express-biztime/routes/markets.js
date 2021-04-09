const express = require("express");
const mRouter = express.Router();
const db = require("../db");

mRouter.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM markets`);
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

mRouter.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO markets (comp_code, ind_code) VALUES ($1, $2) RETURNING *`,
      [req.body.comp_code, req.body.ind_code]
    );
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

mRouter.delete("/:id", async (req, res, next) => {
  try {
    const results = await db.query(`DELETE FROM markets WHERE id=$1`, [
      req.params.id,
    ]);
    return res.json({ response: "Deleted Market Relationship" });
  } catch (err) {
    return next(err);
  }
});

module.exports = mRouter;
