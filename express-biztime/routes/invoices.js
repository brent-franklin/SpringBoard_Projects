const express = require("express");
const iRouter = express.Router();
const db = require("../db");

iRouter.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT id, comp_code FROM invoices`);
    return res.json({ invoices: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

iRouter.get("/:id", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT id, amt, paid, add_date, paid_date, code, name, description FROM invoices i JOIN companies c ON i.comp_Code=c.code WHERE i.id=$1`,
      [req.params.id]
    );
    const r = results.rows[0];
    return res.json({
      invoices: [r.id, r.amt, r.paid, r.add_date, r.paid_date],
      company: [r.code, r.name, r.description],
    });
  } catch (err) {
    return next(err);
  }
});

iRouter.post("/", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`,
      [req.body.comp_code, req.body.amt]
    );
    return res.json({ invoice: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

iRouter.patch("/:id", async (req, res, next) => {
  try {
    let dbQuery;
    if (req.body.paid) {
      dbQuery = `UPDATE invoices SET amt=$2, paid=true, paid_date=CURRENT_DATE WHERE id=$1 RETURNING *`;
    } else {
      dbQuery = `UPDATE invoices SET amt=$2, paid=false, paid_date=NULL WHERE id=$1 RETURNING *`;
    }
    const results = await db.query(dbQuery, [req.params.id, req.body.amt]);
    return res.json({ company: [results.rows] });
  } catch (err) {
    return next(err);
  }
});

iRouter.delete("/:id", async (req, res, next) => {
  try {
    const results = await db.query(`DELETE FROM invoices WHERE id=$1`, [
      req.params.id,
    ]);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = iRouter;
