const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=1118";
let names1 = null;
let names2 = null;
const iChooseYou = document.getElementById("pokeBtn");

// this grabs all the pokemon
const response1 = axios.get(baseURL).then((res) => {
  console.log(res);
});

// this chooses three random pokemon and prints the objects to the console
const response2 = axios
  .get(baseURL)
  .then((res) => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      // choose three random pokemon and push to array
      const randNum = Math.floor(Math.random() * res.data.count);
      const pokemon = axios.get(res.data.results[randNum].url);
      promises.push(pokemon);
    }
    return Promise.all(promises); // using promise.all to send them all at once
  })
  .then((res) => {
    // for each response log to the console
    res.forEach((pokemon) => console.log(pokemon));
  });

// this chooses three random pokemon and also logs data about each one
const response3 = axios
  .get(baseURL)
  .then((res) => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      // choose three random pokemon
      const randNum = Math.floor(Math.random() * res.data.count);
      const pokemon = axios.get(res.data.results[randNum].url);
      promises.push(pokemon);
    }
    return Promise.all(promises); // using promise.all to send them all at once
  })
  .then((res) => {
    names1 = res.map((pokemon) => {
      return pokemon.data.name; // save each name to names1 for later use
    });
    return Promise.all(
      res.map((pokemon) => axios.get(pokemon.data.species.url)) // grab data specific to the pokemon
    );
  })
  .then((res) => {
    // for each item in response grab a random english entry
    for (let i = 0; i < res.length; i++) {
      const entry = res[i].data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      console.log(
        //log corresponding pokemon to its entry in res
        `${names1[i]}: ${entry ? entry.flavor_text : "No Entry Found"}`
      );
    }
  });

const response4 = () =>
  axios
    .get(baseURL)
    .then((res) => {
      $("#container").empty(); // empty the container if already has pokemon
      const promises = [];
      for (let i = 0; i < 3; i++) {
        // choose three random pokemon
        const randNum = Math.floor(Math.random() * res.data.count);
        const pokemon = axios.get(res.data.results[randNum].url);
        promises.push(pokemon);
      }
      return Promise.all(promises); // use promise.all to send all requests at once
    })
    .then((res) => {
      // save name and image to names2 of pokemon for later use
      names2 = res.map((pokemon) => {
        return {
          name: pokemon.data.name,
          img: pokemon.data.sprites.front_shiny,
        };
      });
      return Promise.all(
        // getting data for each of the chosen pokemon
        res.map((pokemon) => axios.get(pokemon.data.species.url))
      );
    })
    .then((res) => {
      $("#container").empty(); // empty container of already has pokemon
      for (let i = 0; i < res.length; i++) {
        // save three random english entries
        const entry = res[i].data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const $card = $(
          // add pokemon to dom with image and entries
          `<div class='pokemon'>${
            names2[i].img
              ? `<img src='${names2[i].img}'/>`
              : "<p class='noImg'>No Image Found<p>"
          }<h3>${names2[i].name}</h3><p class='entry'>${
            entry.flavor_text
          }</p></div>`
        ).appendTo("#container");
      }
    });

iChooseYou.addEventListener("click", response4);
