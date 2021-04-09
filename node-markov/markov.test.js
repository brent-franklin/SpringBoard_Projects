const { MarkovMachine } = require("./markov");

describe("markov machine with bigram option", () => {
  test("makes chains", () => {
    let mm = new MarkovMachine("the cat in the hat is in the hat");

    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the", "the"]],
        ["hat", ["is", null]],
        ["is", ["in"]],
      ])
    );
  });

  test("makes bigram chains", () => {
    let mb = new MarkovMachine("the cat in the hat is in the hat", true);

    expect(mb.chains).toEqual(
      new Map([
        ["the cat", ["in"]],
        ["cat in", ["the"]],
        ["in the", ["hat", "hat"]],
        ["the hat", ["is", null]],
        ["hat is", ["in"]],
        ["is in", ["the"]],
      ])
    );
  });

  test("markov loads text", () => {
    let mm = new MarkovMachine();
    expect(mm.words).toEqual(undefined);
    mm.loadText("the cat in the hat is in the hat");
    expect(mm.words).toEqual("the cat in the hat is in the hat".split(" "));
  });

  test("after load it makes chains", () => {
    let mm = new MarkovMachine();
    let mb = new MarkovMachine();

    mm.loadText("the cat in the hat is in the hat");
    mm.generateChains();
    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the", "the"]],
        ["hat", ["is", null]],
        ["is", ["in"]],
      ])
    );

    mb.loadText("the cat in the hat is in the hat");
    mb.bigram = true;
    mb.generateBigram();
    expect(mb.chains).toEqual(
      new Map([
        ["the cat", ["in"]],
        ["cat in", ["the"]],
        ["in the", ["hat", "hat"]],
        ["the hat", ["is", null]],
        ["hat is", ["in"]],
        ["is in", ["the"]],
      ])
    );
  });

  test("it makes text once chains are created", () => {
    let mm = new MarkovMachine();
    let mb = new MarkovMachine();

    mm.loadText("the cat in the hat is in the hat");
    mm.generateChains();
    expect(mm.generateText()).not.toBeNull();

    mb.loadText("the cat in the hat is in the hat");
    mb.bigram = true;
    mb.generateBigram();
    expect(mb.generateText()).not.toBeNull();
  });
});
