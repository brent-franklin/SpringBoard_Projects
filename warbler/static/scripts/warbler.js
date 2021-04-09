// Likes and follows are handled with AJAX

const messagesFrom = document.querySelector("#messages");
const sendWarbleBtn = document.querySelector("#sendWarble");
const warbleForm = document.querySelector(".modal-body form");
const warbleInput = document.querySelector("#text").value;
const csrfToken = document.querySelector("#csrf_token").value;

async function changeToThumbsUp(likeBtn) {
  response = await axios.post(
    `http://localhost:5000/users/${likeBtn.dataset.id}/like/delete`
  );
}

async function changeToStar(likeBtn) {
  response = await axios.post(
    `http://localhost:5000/users/${likeBtn.dataset.id}/like/add`
  );
}

async function handleLike(evt) {
  let likeBtn;
  if (evt.target.classList.contains("btn")) {
    evt.preventDefault();
    likeBtn = evt.target.firstElementChild;
  } else if (evt.target.classList.contains("fa")) {
    evt.preventDefault();
    likeBtn = evt.target;
  }

  likeBtn.classList.toggle("fa-thumbs-up");
  likeBtn.classList.toggle("fa-star");
  likeBtn.parentElement.classList.toggle("btn-secondary");
  likeBtn.parentElement.classList.toggle("btn-primary");

  if (likeBtn.classList.contains("fa-thumbs-up")) {
    return await changeToThumbsUp(likeBtn);
  } else if (likeBtn.classList.contains("fa-star")) {
    return await changeToStar(likeBtn);
  }
}

messagesFrom.addEventListener("click", handleLike);

// Message model from bootstrap

$("#messageModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  modal.find(".modal-title").text("Make a new Warble!");
});

async function sendWarble(evt) {
  evt.preventDefault();
  const response = await axios.post({
    url: "http://localhost:5000/messages/new",
    headers: {
      csrf_token: csrfToken,
    },
    data: {
      text: warbleInput,
    },
  });
  console.log(response);
}

sendWarbleBtn.addEventListener("click", sendWarble);
