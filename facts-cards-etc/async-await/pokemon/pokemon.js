
const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=1118";
let names1 = null;
let names2 = null;
const iChooseYou = document.getElementById("pokeBtn");

const response1 = async () => {
    const allPokemon = await axios.get(baseURL)
    console.log(allPokemon);
};
response1()

const response2 = async () => {
    const allPokemon = await axios.get(baseURL);
    [allPokemon, allPokemon, allPokemon].forEach(async p => {
       const randNum = Math.floor(Math.random() * p.data.count);
       const pokemon = await axios.get(p.data.results[randNum].url);
       console.log(pokemon.data);
    })
}
response2();

const response3 = async () => {
    const pokemon = [];
    const allPokemon = await axios.get(baseURL);
     const theChosenThree = await Promise.all([allPokemon, allPokemon, allPokemon].map(async p => {
       const randNum = Math.floor(Math.random() * p.data.count);
       return await axios.get(p.data.results[randNum].url);
    }))
    const theThreeData = await Promise.all(theChosenThree.map(async p => {
        pokemon.push({name:p.data.name})
        return await axios.get(p.data.species.url);
    }));
    theThreeData.forEach((p, i) => {
       const entry = p.data.flavor_text_entries.find(
         (entry) => entry.language.name === "en"
       );
       console.log(`${pokemon[i].name}: ${entry.flavor_text ? entry.flavor_text: 'No Entry Found'}`)
    })
}
response3();

const response4 = async () => {
    $("#container").empty();
    iChooseYou.removeEventListener("click", response4);
    const pokemon = [];
    const allPokemon = await axios.get(baseURL);
     const theChosenThree = await Promise.all([allPokemon, allPokemon, allPokemon].map(async p => {
       const randNum = Math.floor(Math.random() * p.data.count);
       return await axios.get(p.data.results[randNum].url);
    }))
    const theThreeData = await Promise.all(theChosenThree.map(async p => {
        pokemon.push({name:p.data.name, img:p.data.sprites.front_shiny})
        return await axios.get(p.data.species.url);
    }));
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
    })
    iChooseYou.addEventListener("click", response4);
}

iChooseYou.addEventListener("click", response4);
