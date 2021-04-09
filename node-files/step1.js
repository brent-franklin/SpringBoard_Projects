const fs = require("fs");
const argv = process.argv;

// Read from file at given path
const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      // If error then log to console for user
      console.log(`ERROR: Unable to read ${path}`);
      console.log("ERROR: ", err);
      process.exit(1);
    }
    console.log("File: ", data);
  });
};
cat(argv[2]);
