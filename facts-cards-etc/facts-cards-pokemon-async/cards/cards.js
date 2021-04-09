const baseURL = "https://deckofcardsapi.com/api/deck";
const drawBtn = document.getElementById("btn");
const cardPile = document.getElementById("cards");

// Generate new deck and pull a card log to console

let response1 = async () => {
  // get deck then pull one card
  const deck = await axios.get(`${baseURL}/new/shuffle/`);
  const card = await axios.get(`${baseURL}/${deck.data.deck_id}/draw`);
  console.log( // log to console
    `You drew a ${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`
  );
};
response1();

// Generate new deck and pull 2 cards log to console

let response2 = async () => {
  const deck = await axios.get(`${baseURL}/new/shuffle/`);
  for (let i = 0; i < 2; i++) {
    const card = await axios.get(`${baseURL}/${deck.data.deck_id}/draw`);
    console.log(
      `You drew a ${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`
    );
  }
};
response2();

// Generate new card every time the button is cliecks

async function drawCard() {
  const deck = await axios.get(`${baseURL}/new/shuffle/`); // new deck
  const draw = await axios.get(`${baseURL}/${deck.data.deck_id}/draw/`); // draw card
  const cardImage = draw.data.cards[0].image; // grab image
  const newImage = document.createElement("IMG"); create img tag
  let randNum1 = Math.random() * 90 - 30; // random placement for realism
  let randNum2 = Math.random() * 30; // random placement for realism
  let randNum3 = Math.random() * 30; // random placement for realism
  newImage.classList = "card"; // for css
  newImage.src = cardImage; // add image to tag
  newImage.style.transform = `translate(${randNum2}px, ${randNum3}px) rotateZ(${randNum1}deg)`; // random placement
  cardPile.append(newImage); // append to web page
}

drawBtn.addEventListener("click", drawCard);
