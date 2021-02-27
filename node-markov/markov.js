/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text, bigram = false) { 
    this.bigram = bigram;
    if(text) {
      if(typeof text !== 'string') return console.error("Only string/text input accepted, please load text with loadText Option")
      this.loadText(text);
      if(this.bigram){
        this.generateBigram();
      } else {
        this.generateChains();
      }
    } else {
      console.log("Markov Machine ready to load text");
    }
  }

  // Load text into the Markov Machine

  loadText(text) {
    if(typeof text !== 'string') return console.error("Only string/text input accepted, please load text with loadText Option")
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    console.log("Markov Machine ready to generate a chain!")
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  generateChains() {
    if(!this.words) return console.error('Please load text with loadText option');
    this.bigram = false;
    this.chains = this.words.reduce((acc, word, i, arr) => {
      let nextWord = arr[i+1] || null;
      acc.has(word) 
      ? acc.get(word).push(nextWord) 
      : acc.set(word, [nextWord]);
      return acc;
    }, new Map())
    console.log("Markov Machine ready to generate text");
  }

  generateBigram() {
    if(!this.words) return console.error('Please load text with loadText option');
    this.bigram = true;
    this.chains = this.words.reduce((acc, word, i, arr) => {
      const nextWord = arr[i + 2] || null;
      const bigram = word + " " + arr[i + 1];
      if(bigram.includes('undefined')) return acc;
      acc.has(bigram) 
      ? acc.get(bigram).push(nextWord) 
      : acc.set(bigram, [nextWord]);
      return acc;
    }, new Map())
    console.log("Markov Machine Bigram ready to generate text");   
  }

  /** return random text from chains */

  generateText(numWords = 100) {
    if(!this.chains) return console.error('Please generate chain or bigram with generateChains or generateBigram options');
    const markovOutput = [];
    const keys = [...this.chains.keys()];
    let choice = keys[Math.floor(Math.random() * keys.length)];
    if(this.bigram){
      while (markovOutput.length <= numWords && !choice.includes(null)){
        let [key1, key2] = choice.split(" ");
        markovOutput.push(key1);
        const newChoice = this.chains.get(choice);
        choice = key2 + " " + newChoice[Math.floor(Math.random() * newChoice.length)];
      }
    } else {
      while (markovOutput.length <= numWords && choice !== null){
        markovOutput.push(choice);
        const newChoice = this.chains.get(choice);
        choice = newChoice[Math.floor(Math.random() * newChoice.length)];
      }
    }
    return markovOutput.join(" ");
}

}

// const mm = new MarkovMachine("the cat in the hat is in the hat");
// const bg = new MarkovMachine("the cat in the hat is in the hat", true);


module.exports = { MarkovMachine };