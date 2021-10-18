const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { ExpressError, NotFoundError } = require('../expressError');

/** User class for message.ly */

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const checkExistingUsers = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    // If usernaem already in DB then throw error
    if (checkExistingUsers.rows[0]) {
      throw new ExpressError(`Error: Duplicate Username - ${username}`, 400);
    }

    // Hash user password to keep it safe while stored in DB
    const hashedPasswd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // After Passwd hash, add user to DB with info and hashed passwd
    const results = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7)
               RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPasswd, first_name, last_name, phone, new Date(), new Date()]
    );

    return results.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const user = await db.query(
      `SELECT username, password
             FROM users
             WHERE username = $1`,
      [username]
    );
    return user.rows[0]?.password ? await bcrypt.compare(password, user.rows[0].password) : false;
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const userLog = await db.query(`UPDATE users SET last_login_at = $1 WHERE username = $2`, [
      new Date(),
      username,
    ]);
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const allUsers = await db.query(`SELECT username, first_name, last_name, phone from users`);
    return allUsers.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const user = await db.query(
      `SELECT username, first_name, last_name, phone, join_at, last_login_at
             FROM users
             WHERE username = $1`,
      [username]
    );
    return user.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const messages = await db.query(
      `SELECT id, to_username, body, sent_at, read_at
               FROM messages
               WHERE from_username = $1`,
      [username]
    );
    const to_user = await db.query(
      `SELECT username, first_name, last_name, phone
                 FROM users
                 WHERE username = $1`,
      [messages.rows[0].to_username]
    );
    const msg = messages.rows[0];
    delete msg.to_username;
    msg.to_user = to_user.rows[0];
    return [msg];
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const messages = await db.query(
      `SELECT id, from_username, body, sent_at, read_at
               FROM messages
               WHERE to_username = $1`,
      [username]
    );
    const from_user = await db.query(
      `SELECT username, first_name, last_name, phone
                 FROM users
                 WHERE username = $1`,
      [messages.rows[0].from_username]
    );
    const msg = messages.rows[0];
    delete msg.from_username;
    msg.from_user = from_user.rows[0];
    return [msg];
  }
}

module.exports = User;
