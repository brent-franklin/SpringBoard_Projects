/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");

/** A reservation for a party */

class Reservation {
  constructor({ id, customerId, numGuests, startAt, notes }) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  get customerId() {
    return this._customerId;
  }

  set customerId(id) {
    if (this._customerId && this._customerId !== id) {
      throw new Error("Change of Customer Id not allowed");
    } else {
      this._customerId = id;
    }
  }

  get numGuests() {
    return this._numGuests;
  }

  set numGuests(guests) {
    if (guests < 1) throw new Error("Must have at least one guest.");
    this._numGuests = guests;
  }

  /** formatter for startAt */

  set startAt(time) {
    if (time instanceof Date && !isNaN(time)) {
      this._startAt = moment(time).format("MMMM Do YYYY, hh:mm a");
    } else {
      throw new Error("Invalid start date");
    }
  }

  get startAt() {
    return this._startAt;
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
      `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1
         ORDER BY start_at DESC`,
      [customerId]
    );

    return results.rows.map((row) => new Reservation(row));
  }

  static async getSingleReservation(reservationId) {
    const results = await db.query(
      `SELECT id,
           customer_id AS "customerId",
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes
         FROM reservations 
        WHERE id=$1`,
      [reservationId]
    );
    return new Reservation(results.rows[0]);
  }

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO reservations (customer_id, start_at, num_guests, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.customerId, this.startAt, this.numGuests, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE reservations SET start_at=$1, num_guests=$2, notes=$3
             WHERE id=$4`,
        [this.startAt, this.numGuests, this.notes, this.id]
      );
    }
  }
}

module.exports = Reservation;
