const baseURL = "https://deckofcardsapi.com/api/deck";
const drawBtn = document.getElementById("btn");
const cardPile = document.getElementById("cards");

let response1 = async () => {
  const deck = await axios.get(`${baseURL}/new/shuffle/`)
  const card = await axios.get(`${baseURL}/${deck.data.deck_id}/draw`)
  console.log(`You drew a ${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`)
}
response1();

let response2 = async () => {
  const deck = await axios.get(`${baseURL}/new/shuffle/`);
  for(let i = 0; i < 2; i++){
  const card = await axios.get(`${baseURL}/${deck.data.deck_id}/draw`);
  console.log(`You drew a ${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`);
  }
}
response2();

async function drawCard() {
  const deck = await axios.get(`${baseURL}/new/shuffle/`)
  const draw = await axios.get(`${baseURL}/${deck.data.deck_id}/draw/`)
    const cardImage = draw.data.cards[0].image;
    const newImage = document.createElement("IMG");
    let randNum1 = Math.random() * 90 - 30;
    let randNum2 = Math.random() * 30;
    let randNum3 = Math.random() * 30;
    newImage.classList = "card";
    newImage.src = cardImage;
    newImage.style.transform = `translate(${randNum2}px, ${randNum3}px) rotateZ(${randNum1}deg)`;
    cardPile.append(newImage);
}

drawBtn.addEventListener("click", drawCard);
