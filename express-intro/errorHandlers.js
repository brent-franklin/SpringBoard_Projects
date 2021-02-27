class ExpressError extends Error {
  constructor(info, status) {
    super();
    this.info = info;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = { ExpressError };
