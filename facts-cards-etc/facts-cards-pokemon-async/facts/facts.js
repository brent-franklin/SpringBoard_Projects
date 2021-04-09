const baseURL = "http://numbersapi.com";
const factList = document.getElementById("facts");

// grab one fact from base URL about favNum
const res1 = async (favNum = 5) => {
  const res = await axios.get(`${baseURL}/${favNum}?json`);
  makeList(res.data.text); // handles single inputs or arrays
};

// grab facts about array favNums
const res2 = async (favNums = [1, 2, 3, 4, 5]) => {
  for (num of favNums) {
    const facts = await axios.get(`${baseURL}/${num}?json`);
    makeList(facts.data.text); // handles single inputs or arrays
  }
};

// grab 4 facts about favNum
const res3 = async (favNum = 5) => {
  for (let i = 0; i < 4; i++) {
    const facts = await axios.get(`${baseURL}/${favNum}?json`);
    makeList(facts.data.text);
  }
};

// this is used to parse data from arrays or single inputs
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

// call all the functions at once on load
const callFuncs = async (res1, res2, res3) => {
  const firstCall = await res1(10);
  const secondCall = await res2([2, 4, 6, 8, 10]);
  const thirdCall = await res3(3);
};

callFuncs(res1, res2, res3);
