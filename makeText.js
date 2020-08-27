const fs = require("fs");
const axios = require("axios");
const argv = process.argv;
const { MarkovMachine } = require("./markov");

let text;

if (argv[2] == "file") {
  fs.readFile(argv[3], "utf8", (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      makeText(data);
    }
  });
} else if (argv[2] == "url") {
  urlText(argv[3]);
} else {
  console.log("please specify file or url before text name");
}

function makeText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

async function urlText(url) {
  let res;
  try {
    res = await axios.get(url);
    // console.log("in urltext", res.data);
    makeText(res.data);
  } catch {
    console.log(`Error fetching ${argv[3]}`);
    process.exit(1);
  }
  text = res.data;
  return text;
}
