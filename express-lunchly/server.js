/** Start server for Lunchly. */

const app = require("./app");

const server = require("http").createServer(app);

server.listen(3000, function () {
  console.log("listening on 3000");
  // server.close();
});

module.exports = server;
