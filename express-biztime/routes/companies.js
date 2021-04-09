const express = require("express");
const cRouter = express.Router();
const db = require("../db");
const slugify = require("slugify");

cRouter.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT code, name FROM companies`);
    return res.json({ companies: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

cRouter.get("/:code", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT c.code, c.name, c.description, n.id as invoice_id, i.industry FROM companies c JOIN markets m ON c.code=m.comp_code JOIN industries i ON i.code=m.ind_code JOIN invoices n ON n.comp_code=c.code WHERE c.code=$1`,
      [req.params.code]
    );
    const r = results.rows[0];
    return res.json({
      company: [
        r.code,
        r.name,
        r.description,
        { invoices: [...new Set(results.rows.map((i) => i.invoice_id))] },
        { industries: [...new Set(results.rows.map((i) => i.industry))] },
      ],
    });
  } catch (err) {
    return next(err);
  }
});

cRouter.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`,
      [
        slugify(req.body.name.toLowerCase()),
        req.body.name,
        req.body.description,
      ]
    );
    return res.json({ company: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

cRouter.patch("/:code", async (req, res, next) => {
  try {
    const results = await db.query(
      `UPDATE companies SET name=$2, description=$3 WHERE code=$1 RETURNING *`,
      [
        req.params.code,
        slugify(req.body.name.toLowerCase()),
        req.body.description,
      ]
    );
    return res.json({ company: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

cRouter.delete("/:code", async (req, res, next) => {
  try {
    const results = await db.query(`DELETE FROM companies WHERE code=$1`, [
      req.params.code,
    ]);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = cRouter;
