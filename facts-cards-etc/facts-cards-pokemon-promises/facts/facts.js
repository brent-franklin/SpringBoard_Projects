const favNum = 5;
const favNums = [1, 2, 3, 4, 5];
const baseURL = "http://numbersapi.com";
const factList = document.getElementById("facts");
const promises = [];

// grab a fact about favNum
res1 = axios
  .get(`${baseURL}/${favNum}?json`)
  .then((res) => makeList(res.data.text)); // handles arrays or single values

// grab a dact about array favNums
res2 = axios.get(`${baseURL}/${favNums}?json`).then((res) => {
  let facts = Object.keys(res.data).map(function (key) {
    return res.data[key]; // use keys from res.data to grab values from res.data
  });
  makeList(facts); // handles arrays or single values
});

// make a list of 4 promises and store them in promises array
for (let i = 0; i < 4; i++) {
  promises.push(axios.get(`${baseURL}/${favNum}?json`));
}

// call all 4 promisees at once from promise array
Promise.all(promises).then((res) => {
  res.forEach((item) => makeList(item.data.text));
});

// makeList is used for choosing between string and array input

function makeList(res) {
  // If string input then create html li tag and append w/ res as text for li
  if (typeof res === "string") {
    const factLi = document.createElement("LI");
    factLi.innerText = res;
    factList.append(factLi);
  } else {
    // If not string then its an array and will be parsed individually with forEach
    res.forEach((fact) => {
      const factLi = document.createElement("LI");
      factLi.innerText = fact;
      factList.append(factLi);
    });
  }
}
