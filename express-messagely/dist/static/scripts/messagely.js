// manage user interface and messages on the client side

const loginForm = document.querySelector('#login');
const registrationForm = document.querySelector('#register');
const cookies = {};

// Login and Register

async function login(evt) {
  evt.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
    }),
  };
  const res = await fetch('http://localhost:3000/auth/login', options);
  console.log(res);
  document.cookie = `reg = ${res.data.token}; HttpOnly; Secure; SameSite=None`;
}

loginForm?.addEventListener('submit', login);

async function register(evt) {
  evt.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
      first_name: document.querySelector('#first_name').value,
      last_name: document.querySelector('#last_name').value,
      phone: document.querySelector('#phone').value,
    }),
  };
  const res = await fetch('http://localhost:3000/auth/register', options);
  const token = await res.json();
  console.log(token.token);
  localStorage.setItem('t2', token.token);
}

function getCookie(cookieKey) {
  const cookiesArr = document.cookie.split(`;`);
  for (let c of cookiesArr) {
    const [cookieKey, cookieValue] = c.trim().split('=');
    cookies[cookieKey] = cookieValue;
  }
}
getCookie('uni-registered');

registrationForm?.addEventListener('submit', register);

class ClientUser {
  constructor(username, first_name, last_name, phone, JWToken, join_at, last_login_at) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.join_at = join_at;
    this.last_login_at = last_login_at;
    this._JWToken = JWToken;
  }
}
