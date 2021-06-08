const { ShoppingCart } = require("./utilities");
const express = require("express");
const router = express.Router();

const Cart = new ShoppingCart();

// this is to return all of the items in the fakeDb
router.get("", (req, res, next) => {
  try {
    return res.send({ body: Cart.db });
  } catch (err) {
    return next(err);
  }
});

// this is to search for a single item in the fakeDb
router.get("/:item", (req, res, next) => {
  try {
    const item = Cart.listOneItem(req.params.item);
    return res.send({ body: item });
  } catch (err) {
    next(err);
  }
});

// this is to add an item to the fakeDb
router.post("", async (req, res, next) => {
  try {
    for (item in req.query) {
      await Cart.addItem(item, req.query[item]);
      return res.json({ body: `${item} has been added!` });
    }
  } catch (err) {
    return next(err);
  }
});

// this is to update an item by removing the old one and adding the new one
router.patch("/:item", (req, res, next) => {
  try {
    const oldItem = req.params.item;
    Cart.removeItem(oldItem);
    const item = req.body.name;
    const price = req.body.price;
    const db = Cart.addItem(item, price, true);
    return res.json({
      body: `${oldItem} has been updated to ${item} at $${price}`,
      db: Cart.db,
    });
  } catch (err) {
    return next(err);
  }
});

// this is to delete an item from the fakeDb
router.delete("/:item", (req, res, next) => {
  try {
    Cart.removeItem(req.params.item);
    return res.json({ body: `Deleted ${req.params.item}` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
