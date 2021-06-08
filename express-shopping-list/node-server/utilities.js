const fs = require("fs");

// this offers more info when handling errors
class ExpressError extends Error {
  constructor(info, status) {
    super();
    this.info = info;
    this.status = status;
    console.error(this.stack);
  }
}

// this is the fakeDb shopping card and maintains the items within the fakeDb.json
class ShoppingCart {
  constructor() {
    fs.readFile("./fakeDb/fakeDb.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        console.log("Error reading from fakeDb.json", err);
        process.exit(1);
      } else {
        if (data) {
          this.db = JSON.parse(data); // if data is found then load to db
        } else {
          this.db = []; // if no data then set db to empty array
        }
      }
    });
  }

  // sends card for refreshes requested by the user
  listAllItems() {
    return this.db;
  }

  // send the item searched for by user
  listOneItem(name) {
    for (item of this.db) {
      if (item.name === name) {
        return item;
      }
    }
  }

  // checks if an item already exists in fakeDb, if not then it will add item
  addItem(name, price) {
    const checkDb = this.db.some((item) => item.name === name);
    if (checkDb) {
      throw new ExpressError(
        `ERROR - ${name} already in cart. Only one of each item allowed`,
        403
      );
    } else {
      this.db.push({
        name: name,
        price: price,
      });
      this.writeToDb(this.db); // this updates the fakeDb.json
      return this.db;
    }
  }

  // removes an item from the fakeDb
  removeItem(name) {
    const newDb = this.db.filter((item) => item.name !== name);
    this.db = newDb;
    this.writeToDb(this.db); // this updates the fakeDb.json
  }

  // this is the utility function to write the fakeDb info
  writeToDb(data) {
    fs.writeFile(
      "./fakeDb/fakeDb.json",
      JSON.stringify(data),
      "utf8",
      function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        } else {
          console.log(`Successfully wrote to fakeDb.json`);
        }
      }
    );
  }
}

// const Cart = new ShoppingCart();

module.exports = { ExpressError, ShoppingCart };
