const baseURL = "https://deckofcardsapi.com/api/deck";
const drawBtn = document.getElementById("btn");
const cardPile = document.getElementById("cards");
let deckId = null;

let response1 = axios
  .get(`${baseURL}/new/shuffle/`) // grab new shuffled deck from api
  .then((res) => {
    // get the deck and save then draw one card
    const deck = res.data.deck_id;
    return axios.get(`${baseURL}/${deck}/draw/`);
  })
  .then((res) => {
    // once card is received lof to console
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
    // return axios.get(`${baseURL}/new/draw/`); // this is how to draw another
  });

let response2 = axios
  .get(`${baseURL}/new/shuffle/`) // grab new shuffled deck from api
  .then((res) => {
    // save deck and the draw a card
    const deck = res.data.deck_id;
    return axios.get(`${baseURL}/${deck}/draw/`);
  })
  .then((res) => {
    // log to console the new card and draw another
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
    return axios.get(`${baseURL}/new/draw/`);
  })
  .then((res) => {
    // lof to console the second card
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
  });

// Save deck to play with in the browser on load
let newDeck = axios.get(`${baseURL}/new/shuffle/`).then((res) => {
  deckId = res.data.deck_id;
});

// On click the deck saved draws a card
// It takes the image and appends it to the web page

function drawCard() {
  axios.get(`${baseURL}/${deckId}/draw/`).then((res) => {
    const cardImage = res.data.cards[0].image;
    const newImage = document.createElement("IMG");
    let randNum1 = Math.random() * 90 - 30;
    let randNum2 = Math.random() * 30;
    let randNum3 = Math.random() * 30;
    newImage.classList = "card";
    newImage.src = cardImage;
    newImage.style.transform = `translate(${randNum2}px, ${randNum3}px) rotateZ(${randNum1}deg)`;
    cardPile.append(newImage);
  });
}

drawBtn.addEventListener("click", drawCard);
