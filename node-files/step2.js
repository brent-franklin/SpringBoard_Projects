const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

// Read file from given path
const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      // if error then log to console for user
      console.log(`ERROR: Unable to read ${path}`);
      console.log("ERROR: ", err);
      process.exit(1);
    }
    console.log("File: ", data);
  });
};

// Parse URL data from given URL
const webCat = async (url) => {
  try {
    const webpage = await axios.get(url);
    console.log(webpage.data);
  } catch (err) {
    // If error then log to console for user
    console.log(`Error fetching "${url}"`);
    console.log(`Error: Request failed with "${err}"`);
    process.exit(1);
  }
};

// If includes http then parse as URL

if (argv[2].includes("http")) {
  webCat(argv[2]);
} else {
  // If doesnt include http then read as path from file
  cat(argv[2]);
}
