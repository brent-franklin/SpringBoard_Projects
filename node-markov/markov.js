/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text, bigram = false) {
    // text to load and whether or not to parse as bigram
    this.bigram = bigram; // save default or user input
    if (text) {
      // If there is text then load it
      if (typeof text !== "string")
        // mm can only load text data
        return console.error(
          "Only string/text input accepted, please load text with loadText Option"
        );
      this.loadText(text); // save text for use
      if (this.bigram) {
        // if bigram is truthy then load for bigram chain
        this.generateBigram();
      } else {
        // if bigram is falsy then load markov chain
        this.generateChains();
      }
    } else {
      // if there is no text then let the user know its ready to load
      console.log("Markov Machine ready to load text");
    }
  }

  // Load text into the Markov Machine
  // This parses the text from differently if it is from a file or url

  loadText(text, url) {
    if (typeof text !== "string")
      return console.error(
        "Only string/text input accepted, please load text with loadText Option"
      );
    if (!url) {
      // if no url then split on new line or carriage return
      const wordsArr = text.split(/[ \r\n]+/);
      this.words = wordsArr.filter((c) => c !== "");
    } else {
      // if url then split on whitespace
      const wordsArr = text.split(/\s/);
      this.words = wordsArr.filter((c) => c !== "");
    }

    // join the words and match for sentence punctuation
    this.sentences = this.words.join(" ").match(/[^\.!\?]+[\.!\?]+/g);
    if (!this.sentences) {
      // if unable to find sentences then choose random start word
      this.startWord = this.words[
        Math.floor(Math.random() * (this.words.length - 1) + 1)
      ];
    } else {
      // if able to parse sentences then choose random word from begining of sentence
      let startArr = this.sentences[
        Math.floor(Math.random() * this.sentences.length)
      ]
        .split(/\s/)
        .splice(1);
      if (startArr.length < 2) return this.loadText(text); // if start array is too short then recursivly try again
      this.startWord = startArr[0] === "" ? startArr[1] : startArr[0];
      this.startBigram =
        startArr[0] === ""
          ? `${startArr[1]} ${startArr[2]}`
          : `${startArr[0]} ${startArr[1]}`; // determine start words depending on of bigram is true
      console.log("Markov Machine ready to generate a chain!"); // inform user the text is loaded
    }
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  generateChains() {
    if (!this.words)
      // if user tries to generate chains before loading, then inform them to laod text
      return console.error("Please load text with loadText option");
    this.bigram = false; // set bigram to false
    this.chains = this.words.reduce((acc, word, i, arr) => {
      // use reduce to create map for chains
      let nextWord = arr[i + 1] || null;
      acc.has(word) ? acc.get(word).push(nextWord) : acc.set(word, [nextWord]);
      return acc;
    }, new Map());
    console.log("Markov Machine ready to generate text"); // let user know they can generate text now
  }

  // If the use sets the bigram true then this will set a bigram chain instead
  // 'the cat' => [ 'in' ],
  // 'cat in' => [ 'the' ],
  // 'in the' => [ 'hat', 'hat' ],
  // 'the hat' => [ 'is', null ],
  // 'hat is' => [ 'in' ],
  // 'is in' => [ 'the' ]

  generateBigram() {
    if (!this.words)
      // if the user has not laoded text then let them know to load first
      return console.error("Please load text with loadText option");
    this.bigram = true; // set bigram to true
    this.chains = this.words.reduce((acc, word, i, arr) => {
      // use reduce to create map for bigrram
      const nextWord = arr[i + 2] || null;
      const bigram = word + " " + arr[i + 1];
      if (bigram.includes("undefined")) return acc;
      acc.has(bigram)
        ? acc.get(bigram).push(nextWord)
        : acc.set(bigram, [nextWord]);
      return acc;
    }, new Map());
    console.log("Markov Machine Bigram ready to generate text"); // let user know they can generate text now
  }

  /** return random text from chains */
  // choose the number of words to limit the output

  generateText(numWords = 100) {
    if (!this.chains)
      return console.error(
        // tell user they need to generate chains before generating text
        "Please generate chain or bigram with generateChains or generateBigram options"
      );
    const markovOutput = []; // <-- this is where the output is saved before this function returns
    if (!this.startBigram) {
      // if start word for bigram is falsy default to markov chain instead
      this.bigram = false; // some things arent able to be parsed into sentences for the bigram
      this.generateChains();
    }
    if (this.bigram) {
      // if bigram is truthy and it has a start word then create text from bigram chains
      let choice = this.startBigram;
      while (markovOutput.length <= numWords && !choice.includes(null)) {
        let [key1, key2] = choice.split(" ");
        markovOutput.push(key1);
        const newChoice = this.chains.get(choice);
        choice =
          key2 + " " + newChoice[Math.floor(Math.random() * newChoice.length)];
      }
    } else {
      // if bigram is falsy and it has a start word then make text from markov chains
      let choice = this.startWord;
      while (markovOutput.length <= numWords && choice !== null) {
        markovOutput.push(choice);
        const newChoice = this.chains.get(choice);
        choice = newChoice[Math.floor(Math.random() * newChoice.length)];
      }
    }
    return markovOutput.join(" "); // join generated text to output
  }
}

// makeText.js will not work if these
// are uncommented but they will log example ouput

// const mm = new MarkovMachine("the cat in the hat is in the hat");
// const bg = new MarkovMachine("the cat in the hat is in the hat", true);

module.exports = { MarkovMachine };
