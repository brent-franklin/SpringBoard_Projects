const container = document.getElementById("container");
const containerId = document.querySelector("#container");
const second = document.querySelectorAll(".second");
const third = document.querySelector("ol > .third");

// containerId.innerText = 'Hello\!';

const footer = document.querySelector(".footer");
footer.classList.add("main");
footer.classList.remove("main");

const li = document.createElement("li");
li.innerText = "four";

const ul = document.querySelector("ul");

ul.appendChild(li);

const lis = document.querySelectorAll("ol > li");

for (let i of lis) {
  i.style.backgroundColor = "green";
}

document.body.removeChild(footer);

footer.remove();
