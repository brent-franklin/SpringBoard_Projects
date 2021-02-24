const favNum = 5;
const favNums = [1, 2, 3, 4, 5];
const baseURL = "http://numbersapi.com";
const factList = document.getElementById("facts");
const promises = [];

res1 = axios
  .get(`${baseURL}/${favNum}?json`)
  .then((res) => makeList(res.data.text));

res2 = axios.get(`${baseURL}/${favNums}?json`).then((res) => {
  let facts = Object.keys(res.data).map(function (key) {
    return res.data[key];
  });
  makeList(facts);
});

for (let i = 0; i < 4; i++) {
  promises.push(axios.get(`${baseURL}/${favNum}?json`));
}

Promise.all(promises).then((res) => {
  res.forEach((item) => makeList(item.data.text));
});

function makeList(res) {
  if (typeof res === "string") {
    const factLi = document.createElement("LI");
    factLi.innerText = res;
    factList.append(factLi);
  } else {
    res.forEach((fact) => {
      const factLi = document.createElement("LI");
      factLi.innerText = fact;
      factList.append(factLi);
    });
  }
}
