const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=1118";
let names1 = null;
let names2 = null;
const iChooseYou = document.getElementById("pokeBtn");

// This grabs all of the pokemon and logs the res to the console
const response1 = async () => {
  const allPokemon = await axios.get(baseURL);
  console.log(allPokemon);
};
response1();

// this logs 3 random pokemon to console
const response2 = async () => {
  // grab all pokemon
  const allPokemon = await axios.get(baseURL);
  [allPokemon, allPokemon, allPokemon].forEach(async (p) => {
    // 3 random pokemon from the all pokemon array
    const randNum = Math.floor(Math.random() * p.data.count); // rand num for chosing rand pokemon
    const pokemon = await axios.get(p.data.results[randNum].url); // chose rand pokemon
    console.log(pokemon.data);
  });
};
response2();

// This uses async await and promise.all to send all promises at once
const response3 = async () => {
  const pokemon = [];
  const allPokemon = await axios.get(baseURL);
  const theChosenThree = await Promise.all(
    // using map this time instead of forEach to save the data from random pokemon
    [allPokemon, allPokemon, allPokemon].map(async (p) => {
      const randNum = Math.floor(Math.random() * p.data.count);
      return await axios.get(p.data.results[randNum].url); // each promise saves to the mapped array
    })
  );
  // use that mapped array to get more data on each of the chosen 3
  const theThreeData = await Promise.all(
    theChosenThree.map(async (p) => {
      pokemon.push({ name: p.data.name }); // save the name for later
      return await axios.get(p.data.species.url); // get the data from url of pokemon
    })
  );
  // for each response from the 3 data  grab enligh text
  theThreeData.forEach((p, i) => {
    const entry = p.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    console.log(
      // log the name of the pokemon with the entry
      `${pokemon[i].name}: ${
        entry.flavor_text ? entry.flavor_text : "No Entry Found"
      }`
    );
  });
};
response3();

// Everything is the same as response 3 until the end where it parses the data
// then adds that data to the dom

const response4 = async () => {
  $("#container").empty(); //  empty the current container
  iChooseYou.removeEventListener("click", response4); // remove event until data is parsed
  const pokemon = [];
  const allPokemon = await axios.get(baseURL);
  const theChosenThree = await Promise.all(
    [allPokemon, allPokemon, allPokemon].map(async (p) => {
      const randNum = Math.floor(Math.random() * p.data.count);
      return await axios.get(p.data.results[randNum].url);
    })
  );
  const theThreeData = await Promise.all(
    theChosenThree.map(async (p) => {
      pokemon.push({ name: p.data.name, img: p.data.sprites.front_shiny });
      return await axios.get(p.data.species.url);
    })
  );
  theThreeData.forEach((p, i) => {
    const entry = p.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    $(
      `<div class='pokemon'>${
        pokemon[i].img
          ? `<img src='${pokemon[i].img}'/>`
          : "<p class='noImg'>No Image Found<p>"
      }<h3>${pokemon[i].name}</h3><p class='entry'>${
        entry.flavor_text
      }</p></div>`
    ).appendTo("#container");
  });
  iChooseYou.addEventListener("click", response4); // add event back once data is parsed
};

iChooseYou.addEventListener("click", response4);
