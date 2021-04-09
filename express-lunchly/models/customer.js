/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, middleName, lastName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
  }

  get fullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    !!notes ? (this._notes = notes) : (this._notes = "");
  }

  get phone() {
    return this._phone;
  }

  set phone(phone) {
    !!phone ? (this._phone = phone.toString()) : (this._phone = "");
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         middle_name AS "middleName",
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    const allCustomers = await this.matchCustomerToReservation(results);
    return Promise.all(allCustomers);
  }

  // Matches customer to reservation with the closes start date

  static async matchCustomerToReservation(results) {
    return results.rows.map(async (c) => {
      const r = await Reservation.getReservationsForCustomer(c.id);
      if (r[0]) {
        const reservation = r[0];
        const customer = new Customer(c);
        return [customer, reservation];
      } else {
        const customer = new Customer(c);
        return [customer, ""];
      }
    });
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         middle_name AS "middleName",
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );
    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  // returns the customer based of their name

  static async getCustomerByName(name) {
    const results = await db.query(
      `SELECT id, 
        first_name AS "firstName", 
        middle_name AS "middleName",
        last_name AS "lastName",
        phone,
        notes
      FROM customers WHERE first_name ILIKE $1 OR last_name ILIKE $1`,
      [name]
    );

    if (!results.rows) {
      const err = new Error(`No such customer: ${name}`);
      err.status = 404;
      throw err;
    }

    const customer = await this.matchCustomerToReservation(results);
    return Promise.all(customer);
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, middle_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
        [this.firstName, this.middleName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, middle_name=$2, last_name=$3, phone=$4, notes=$5
             WHERE id=$6`,
        [
          this.firstName,
          this.middleName,
          this.lastName,
          this.phone,
          this.notes,
          this.id,
        ]
      );
    }
  }

  static async valued() {
    const results = await db.query(
      `SELECT 
        c.id,
        c.first_name AS "firstName",
        c.middle_name AS "middleName",
        c.last_name AS "lastName",
        c.phone,
        c.notes
        FROM customers c 
          INNER JOIN reservations r
          ON c.id = r.customer_id
          GROUP BY c.id
          ORDER BY COUNT(c.id) DESC
          LIMIT 10`
    );
    const customers = await this.matchCustomerToReservation(results);
    return Promise.all(customers);
  }
}

module.exports = Customer;
