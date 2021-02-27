/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");
const argv = process.argv;
const { stripHtml } = require('string-strip-html');

class MarkovCLI extends MarkovMachine {
    constructor(arg, input, bigram){
        super();
        this.handleInput(arg, input, bigram);
    }

    // Print markov output to command-line from URL

    async readFromURL(url, bigram){
        try {
            const res = await axios.get(url);
            const strippedRes = stripHtml(res.data);
            this.loadText(stripHtml(res.data).result);
            if (bigram) {
                this.generateBigram();
            } else {
                this.generateChains();
            }
            console.log(this.generateText());
        } catch (err) {
            console.error(`Error - Unable to read input: ${url}`);
            console.error(err);
            process.exit(1);
        }
    }

    // Print markov output to command-line from a file

    readFromFile(path, bigram){
        fs.readFile(path, "utf8", (err, data) => {
            if(err) {
                console.error(`ERROR - Unable to read input: "${path}"`)
                console.error(err);
                process.exit(1)
            } else {
                this.loadText(data);
                if (bigram){
                    this.generateBigram();
                } else {
                    this.generateChains();
                }
                console.log(this.generateText());
            }
        }) 
    }


    // User must enter an option to demarcate whether the input
    // is a file or a url

    handleInput(arg, input, bigram) {
        if (arg) { 
            let a = arg.toLowerCase();
            if (a === 'file'){
                this.readFromFile(input, bigram);
            }else if (a === 'url'){
                this.readFromURL(input, bigram);
            } else {
                 return console.error('Error: Please enter available options of "file" or "url" and try again')
            }
        } else {
            console.error(`Unknown option: ${arg}`)
            console.error('Please include option ("file" or "url") and input (./filename or url)')
            process.exit(1);
        }
    }
}

if(argv[2] !== '-b'){
    if (argv[2].toLowerCase() !== 'file' || argv[2].toLowerCase() !== 'url'){
        return console.error(`Error - Invalid Input: ${argv[2]}`);
    }
    const mmCLI = new MarkovCLI(argv[2], argv[3], false);
 } else {
    const mmCLI = new MarkovCLI(argv[3], argv[4], argv[2]);
 }