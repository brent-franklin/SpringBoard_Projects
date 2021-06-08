// manage user interface and messages on the client side

const loginForm = document.querySelector("#login");
const registrationForm = document.querySelector("#register");
const cookies = {};

// Login and Register

async function login(evt) {
  evt.preventDefault();
  const options = {
    method: "post",
    url: "http://localhost:3000/auth/login",
    data: {
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    },
  };
  const res = await axios(options);
  console.log(res);
  document.cookie = `uni-registered = ${res.data.token}; HttpOnly; Secure; SameSite=None`;
}

loginForm?.addEventListener("submit", login);

async function register(evt) {
  evt.preventDefault();
  const [username, password, first_name, last_name, phone] = [
    document.querySelector("#username"),
    document.querySelector("#password"),
    document.querySelector("#first_name"),
    document.querySelector("#last_name"),
    document.querySelector("#phone"),
  ];
  const res = await axios.post("http://localhost:3000/auth/register", {
    username: username.value,
    password: password.value,
    first_name: first_name.value,
    last_name: last_name.value,
    phone: phone.value,
  });
  localStorage.setItem("uni-registered", res.data.token);
}

function getCookie(cookieKey) {
  const cookiesArr = document.cookie.split(`;`);
  for (let c of cookiesArr) {
    const [cookieKey, cookieValue] = c.trim().split("=");
    cookies[cookieKey] = cookieValue;
  }
}
getCookie("uni-registered");

registrationForm?.addEventListener("submit", register);

class ClientUser {
  constructor(
    username,
    first_name,
    last_name,
    phone,
    JWToken,
    join_at,
    last_login_at
  ) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.join_at = join_at;
    this.last_login_at = last_login_at;
    this._JWToken = JWToken;
  }
}
