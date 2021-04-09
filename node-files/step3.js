const fs = require("fs");
const axios = require("axios");
const argv = process.argv;

// This function reads a file's contents and logs the output.
// If given a file name it will write the output to that given file name.

const cat = (path, fileName) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      // If error, log error for user
      console.error(err);
      `ERROR: Unable to read ${path}`;
      console.log("ERROR: ", err);
      process.exit(1);
    }
    if (fileName) {
      // If file name then write to the file
      writeToFile(fileName, data);
    } else {
      // If no file name then log output to the console
      console.log(data);
    }
  });
};

// This function grabs the html from a URL and logs the output.
// If given a file name it will write the output to the given file name

const webCat = async (url, fileName) => {
  try {
    const webpage = await axios.get(url);
    if (fileName) {
      // If filename is given then write the output to the file
      writeToFile(fileName, webpage.data, url);
    } else {
      // If no file given then log output to console
      console.log(webpage.data);
    }
  } catch (err) {
    // If error is thrown then log the error for the user
    console.error(`Error fetching "${url}"`);
    console.log(`Error: Request failed with "${err}"`);
  }
};

// This function writes to the file given using the data input as an argument

const writeToFile = (fileName, data, url) => {
  fs.writeFile(fileName, data, "utf8", (err) => {
    if (err) {
      // If error then log the error for the user
      console.error(`Error wrting from "${url}"`);
      console.log(`Error: Request failed with "${err}"`);
      process.exit(1);
    }
  });
};

// This function reads from the given file and
// sends the data through the callback "action".

const readFromFile = (data, fileName, action) => {
  fs.readFile(data, "utf8", (err, info) => {
    if (err) {
      console.error`ERROR: Unable to read ${data}`);
      console.log("ERROR: ", err);
      process.exit(1);
    }
    // If no error then send info through callback
    action(fileName, info);
  });
};

// If writing from multiple file sources to one file we 
// need to use appendFile instead of writeFile

const appendFromFile = (fileName, info) => {
  fs.appendFile(fileName, info, (err) => {
    if (err) {
        // If error then log to console for user
      console.error(`Error writing from "${info}"`);
      console.log(`Error: Request failed with "${err}"`);
      process.exit(1);
    }
  });
};

// If writing from muiltiple URL sources to one file we
// need to use appendFile instead of writeFile

const appendFromURL = async (fileName, url) => {
  try {
    const webpage = await axios.get(url);
    fs.appendFile(fileName, webpage.data, (err) => {
      if (err) {
          // If error appending then log to console for user
        console.error(`Error writing from "${url}"`);
        console.log(`Error: Request failed with "${err}"`);
        process.exit(1);
      }
    });
  } catch (err) {
      // If error grabbing URL data then log to console for user
    console.error(`Error fetching "${url}"`);
    console.log(`Error: Request failed with "${err}"`);
  }
};

// This function is for parsing data from URLS or 
// files and outputing to files

const fileOutput = (input = argv[4], newFile = argv[3]) => {
  if (input.includes("http")) { 
    webCat(input, newFile); // Output file name included here
  } else {
    cat(input, newFile); // Output File name included here
  }
};

// This function is for parsing data from URLS or 
// file and outputting to the console

const consoleOutput = (input = argv[2]) => {
  if (input.includes("http")) {
    webCat(input);
  } else {
    cat(input);
  }
};

// --multi allows the user to put in multiple files or urls in one command
// --out allows the user to output to the filename given

const handleInput = (args) => {
    // If --multi or --out flags appear then parse accordingly
  if (args[2] === "--multi" || args[3] === "--multi") { 
    if (args[3] === "--out" || args[2] === "--out") { 
      const [, , , , , ...multiArgs] = argv; // remove unneccessary args
      multiArgs.forEach((arg) => {
        if (arg.includes("http")) { // parse from url or file
          appendFromURL(args[4], arg);
        } else {
          readFromFile(arg, args[4], appendFromFile);
        }
      });
    } else { // if no --out file then log the inputs to the console
      const [, , , ...multiArgs] = argv; // remove unneccessary args
      multiArgs.forEach((arg) => {
        consoleOutput(arg); // log each output
      });
    }
  } else if (args[2] === "--out") { // if no --multi then output to file if --out given
    fileOutput();
  } else { // if no --out then just log the input to console
    consoleOutput();
  }
};

// pass args in to handle input
handleInput(argv);
