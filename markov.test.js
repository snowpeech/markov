/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");

describe("test the markov machine", function () {
  let text =
    "the cat in the hat went to a party at a shack where the cat ate a snack";
  let mm = new MarkovMachine(text);
  test("should create markov machine", function () {
    let keys = [
      "the",
      "cat",
      "in",
      "hat",
      "went",
      "to",
      "a",
      "party",
      "at",
      "shack",
      "where",
      "ate",
      "snack",
    ];
    let words = [
      "the",
      "cat",
      "in",
      "the",
      "hat",
      "went",
      "to",
      "a",
      "party",
      "at",
      "a",
      "shack",
      "where",
      "the",
      "cat",
      "ate",
      "a",
      "snack",
    ];
    expect(mm.keys).toEqual(keys);
    expect(mm.words).toEqual(words);
  });

  test("should generate string of markov text", function () {
    expect(mm.makeText(150)).toEqual(
      expect.stringContaining("the cat", "party at", "shack where")
    );
    expect(
      mm
        .makeText(60)
        .split(" ")
        .filter(function (word) {
          return word !== "." && word !== "";
        })
    ).toHaveLength(60);
  });
});
