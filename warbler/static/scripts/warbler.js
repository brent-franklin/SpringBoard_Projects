// Likes and follows are handled with AJAX

const messagesFrom = document.querySelector("#messages");
const sendWarbleBtn = document.querySelector("#sendWarble");
const warbleForm = document.querySelector(".modal-body form");
const fields = {
  warbleInput: document.querySelector("#text"),
  csrf_token: document.querySelector("#csrf_token"),
};

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
  if (evt.target.innerText == "Delete") return;
  let likeBtn;
  if (evt.target.classList.contains("btn")) {
    evt.preventDefault();
    likeBtn = evt.target.firstElementChild;
  } else if (evt.target.classList.contains("fa")) {
    evt.preventDefault();
    likeBtn = evt.target;
  }

  if (!likeBtn) return;

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

messagesFrom?.addEventListener("click", handleLike);

// Message model from bootstrap

$("#messageModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var modal = $(this);
  modal.find(".modal-title").text("Make a new Warble!");
});

async function sendWarble(evt) {
  evt.preventDefault();
  const response = await axios.post("http://localhost:5000/messages/new", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      csrf_token: fields.csrf_token.value,
      text: fields.warbleInput.value,
    }),
  });
  createMsgElement(response.data.msg, response.data.user);
  fields.warbleInput.value = "";
}

function createMsgElement(msg, user) {
  const $text = $(`<li class="list-group-item">
        <a href="/messages/${msg.id}" class="message-link">
        </a><a href="/users/${msg.user_id}">
          <img src="/static/images/default-pic.png" alt="" class="timeline-image">
          </a><div class="message-area"><a href="/users/${msg.user_id}">
            </a><a href="/users/${msg.user_id}">${user}</a>
            <span class="text-muted">${msg.timestamp}</span>
            <p>${msg.text}</p>
          </div>
      </li>`);
  const $messagesForm = $("#messages");
  $messagesForm.prepend($text[0].outerHTML);
}
sendWarbleBtn?.addEventListener("click", sendWarble);
