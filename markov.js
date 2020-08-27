/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let wordMap = {};
    this.words.forEach(function (value, index, array) {
      if (index + 1 == array.length && wordMap[value]) {
        wordMap[value].push(null);
      } else if (index + 1 == array.length && !wordMap[value]) {
        wordMap[value] = [null];
      } else if (wordMap[value]) {
        wordMap[value].push(array[index + 1]);
      } else {
        wordMap[value] = [array[index + 1]];
      }
    });
    this.wordMap = wordMap;
    this.keys = Object.keys(this.wordMap);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let numMappedWords = this.keys.length;
    let word;

    function startText(keys) {
      word = keys[randNum(numMappedWords)];
      let capword = word.charAt(0).toUpperCase() + word.slice(1);
      text.push(capword);
    }
    startText(this.keys);
    for (let i = 0; i < numWords - 1; i++) {
      let options = this.wordMap[word];
      word = options[randNum(options.length)];
      if (!word) {
        text.push(". ");
        startText(this.keys);
      } else {
        text.push(word);
      }
    }
    // console.log(text.join(" "));
    return text.join(" ");
  }
}

function randNum(max) {
  return Math.floor(Math.random() * max);
}

// let mm = new MarkovMachine(
//   "the cat in the hat went to a party at a shack where the cat ate a snack"
// );
// console.log(mm);
// console.log("none:::", mm.makeText());
// console.log("10:::",  mm.makeText(10));
module.exports = { MarkovMachine };
