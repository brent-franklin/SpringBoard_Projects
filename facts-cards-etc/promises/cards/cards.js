const baseURL = "https://deckofcardsapi.com/api/deck";
const drawBtn = document.getElementById("btn");
const cardPile = document.getElementById("cards");
let deckId = null;

let response1 = axios
  .get(`${baseURL}/new/shuffle/`)
  .then((res) => {
    const deck = res.data.deck_id;
    return axios.get(`${baseURL}/${deck}/draw/`);
  })
  .then((res) => {
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
    return axios.get(`${baseURL}/new/draw/`);
  });

let response2 = axios
  .get(`${baseURL}/new/shuffle/`)
  .then((res) => {
    const deck = res.data.deck_id;
    return axios.get(`${baseURL}/${deck}/draw/`);
  })
  .then((res) => {
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
    return axios.get(`${baseURL}/new/draw/`);
  })
  .then((res) => {
    const cardValue = res.data.cards[0].value.toLowerCase();
    const cardSuit = res.data.cards[0].suit.toLowerCase();
    console.log(`You drew a ${cardValue} of ${cardSuit}`);
  });

let newDeck = axios.get(`${baseURL}/new/shuffle/`).then((res) => {
  deckId = res.data.deck_id;
});

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
