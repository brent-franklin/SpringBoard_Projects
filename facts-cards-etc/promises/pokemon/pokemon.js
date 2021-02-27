const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=1118";
let names1 = null;
let names2 = null;
const iChooseYou = document.getElementById("pokeBtn");

const response1 = axios.get(baseURL).then((res) => {
  console.log(res);
});

const response2 = axios
  .get(baseURL)
  .then((res) => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      const randNum = Math.floor(Math.random() * res.data.count);
      const pokemon = axios.get(res.data.results[randNum].url);
      promises.push(pokemon);
    }
    return Promise.all(promises);
  })
  .then((res) => {
    res.forEach((pokemon) => console.log(pokemon));
  });

const response3 = axios
  .get(baseURL)
  .then((res) => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      const randNum = Math.floor(Math.random() * res.data.count);
      const pokemon = axios.get(res.data.results[randNum].url);
      promises.push(pokemon);
    }
    return Promise.all(promises);
  })
  .then((res) => {
    names1 = res.map((pokemon) => {
      return pokemon.data.name;
    });
    return Promise.all(
      res.map((pokemon) => axios.get(pokemon.data.species.url))
    );
  })
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      const entry = res[i].data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      console.log(
        `${names1[i]}: ${entry ? entry.flavor_text : "No Entry Found"}`
      );
    }
  });

const response4 = () =>
  axios
    .get(baseURL)
    .then((res) => {
      $("#container").empty();
      const promises = [];
      for (let i = 0; i < 3; i++) {
        const randNum = Math.floor(Math.random() * res.data.count);
        const pokemon = axios.get(res.data.results[randNum].url);
        promises.push(pokemon);
      }
      return Promise.all(promises);
    })
    .then((res) => {
      names2 = res.map((pokemon) => {
        return {
          name: pokemon.data.name,
          img: pokemon.data.sprites.front_shiny,
        };
      });
      return Promise.all(
        res.map((pokemon) => axios.get(pokemon.data.species.url))
      );
    })
    .then((res) => {
      $("#container").empty();
      for (let i = 0; i < res.length; i++) {
        const entry = res[i].data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const $card = $(
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
