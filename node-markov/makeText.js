/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");
const argv = process.argv;
const { stripHtml } = require("string-strip-html");

if (argv[2].toLowerCase() === "-help") {
  return console.log(
    `-b option allows the user to run the chain as a bigram
    file command runs the input and tries to read it as a file
    url command runs the input and tries to read data from the url
    multi allows the user to put any number of files and url data through the machine

    Becuase part of the machine looks to parse a bigram from sentences,
    if it can't parse sentences from the text on a website then
    it will default to using the Markov Chain output instead for the url data

    Examples: 
        - node makeText.js -b url http://www.example.com 
        - node makeText.js multi http://www.example.com example.txt`
  );
}

class MarkovCLI extends MarkovMachine {
  constructor(arg, input, bigram) {
    super();
    this.handleInput(arg, input, bigram);
  }

  // Print markov output to command-line from URL

  async readFromURL(url, bigram) {
    try {
      const res = await axios.get(url);
      const strippedRes = stripHtml(res.data).result;
      if (strippedRes === "") {
        return console.error(
          `Error - ${url} has no text to run through the Markov Machine`
        );
      }
      this.loadText(strippedRes, "url");
      if (bigram) {
        this.generateBigram();
      } else {
        this.generateChains();
      }
      console.log(this.generateText());
    } catch (err) {
      console.error(`Error - Unable to read input from url: ${url}`);
      console.error(err);
      process.exit(1);
    }
  }

  // Print markov output to command-line from a file

  readFromFile(path, bigram) {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(`ERROR - Unable to read input from file: "${path}"`);
        // console.error(err);
        process.exit(1);
      } else {
        this.loadText(data);
        if (bigram) {
          this.generateBigram();
        } else {
          this.generateChains();
        }
        console.log(this.generateText());
      }
    });
  }

  // User must enter an option to demarcate whether the input
  // is a file or a url - if multi option wasnt chosen earlier

  handleInput(arg, input, bigram) {
    if (arg) {
      let a = arg.toLowerCase();
      if (a === "file") {
        this.readFromFile(input, bigram);
      } else if (a === "url") {
        this.readFromURL(input, bigram);
      } else {
        return console.error(
          'Error: Please enter available options of "file" or "url" and try again'
        );
      }
    } else {
      console.error(`Unknown option: ${arg}`);
      console.error(
        'Please include option ("file" or "url") and input (./filename or url)'
      );
      process.exit(1);
    }
  }
}

/* 
    -b option allows the user to run the chain as a bigram
    file command runs the input and tries to read it as a file
    url command runs the input and tries to read data from the url
    multi allows the user to put any number of files and url data through the machine

    Becuase part of the machine looks to parse a bigram from sentences,
    if it can't parse sentences from the text on a website then
    it will default to using the Markov Chain output instead for the url data

    Examples: 
        - node makeText.js -b url http://www.example.com 
        - node makeText.js multi http://www.example.com example.txt
*/

// This handles the user input

if (argv[2] !== "-b") {
  // Missing -b flag - this will not run as a bigram
  if (!["file", "url", "multi"].includes(argv[2].toLowerCase())) {
    console.log(
      'Missing arguments - Options available: "file", "url", "multi"'
    );
    console.log("For help use: node makeText.js -help");
    return console.error(`Error - Invalid Input: ${argv[2]}`);
  } else if (argv[2].toLowerCase() === "multi") {
    for (let i = 3; i < argv.length; i++) {
      if (argv[i].includes("http")) {
        let mmCLI = new MarkovCLI("url", argv[i], false);
      } else {
        let mmCLI = new MarkovCLI("file", argv[i], false);
      }
    }
  } else {
    const mmCLI = new MarkovCLI(argv[2], argv[3], false);
  }
} else {
  // Contains -b flag - this will run as a bigram
  if (!["file", "url", "multi"].includes(argv[3])) {
    console.log(
      'Missing arguments - Options available: "file", "url", "multi"'
    );
    console.log("For help use: node makeText.js -help");
    return console.error(`Error - Invalid Input: ${argv[3]}`);
  } else if (argv[3] === "multi") {
    for (let i = 4; i < argv.length; i++) {
      if (argv[i].includes("http")) {
        let mmCLI = new MarkovCLI("url", argv[i], argv[2]);
      } else {
        let mmCLI = new MarkovCLI("file", argv[i], argv[2]);
      }
    }
  } else {
    const mmCLI = new MarkovCLI(argv[3], argv[4], argv[2]);
  }
}
