const { meanFunc, medianFunc, modeFunc } = require("./stats");

describe("testing the math operations", () => {
  test("should calculate the mean", () => {
    expect(meanFunc("1,2,3,4,5")).toEqual(3);
  });

  test("should calculate the median", () => {
    expect(medianFunc("1,3,3,3,3,3,3,3,4,5")).toEqual(3);
    expect(medianFunc("1,2,3,4")).toEqual(2.5);
  });

  test("should calculate the mode", () => {
    expect(modeFunc("1,2,3,4,4")).toEqual("4");
    expect(modeFunc("1,2,3")).toEqual(
      `Mode is the number(s) that appears most often but each num appears an equal number of times`
    );
    expect(modeFunc("1,2,2,3,3")).toEqual("2,3");
  });
});
