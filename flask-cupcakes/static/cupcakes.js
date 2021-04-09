// Add cupcakes

class Cupcake {
  constructor() {
    this.deleteButton = document.getElementById("delete");
    this.cupcakeForm = document.getElementById("cupcake-form");
    this.cupcakeFormButton = this.cupcakeForm.lastElementChild.lastElementChild;
    this.cupcakeSearchForm = document.getElementById("cupcake-search-form");
    this.allCupcakes = document.getElementById("all-cupcakes");
    this.flavor = document.getElementById("flavor");
    this.searchFlavor = document.getElementById("search_flavor");
    this.size = document.getElementById("size");
    this.rating = document.getElementById("rating");
    this.image = document.getElementById("image");
    this.cupcakeList = document.getElementById("cupcake-list");
    this.deleteButton.addEventListener("click", this.deleteCupcake.bind(this));
    this.cupcakeList.addEventListener("click", this.editCupcake.bind(this));
    this.allCupcakes.addEventListener("click", this.getAllCupcakes.bind(this));
    this.cupcakeForm.addEventListener(
      "submit",
      this.handleCupcakeForm.bind(this)
    );
    this.cupcakeSearchForm.addEventListener(
      "submit",
      this.searchCupcakes.bind(this)
    );
    this.getAllCupcakes();
  }

  appendCupcakeToDOM(cupcake) {
    cupcake.forEach((c) => {
      const newLi = document.createElement("LI");
      const newFlavor = document.createElement("H4");
      const newSize = document.createElement("P");
      const newRating = document.createElement("P");
      const newImage = document.createElement("IMG");
      const editButton = document.createElement("BUTTON");

      editButton.id = c.id;
      editButton.classList.add("btn");
      editButton.classList.add("btn-primary");
      editButton.innerText = "Edit Cupcake";

      newFlavor.innerText = `${c.flavor}`;
      newSize.innerText = `Size: ${c.size}`;
      newRating.innerText = `Rating: ${c.rating}`;

      newImage.src = c.image;
      newImage.style.width = "200px";
      newImage.style.borderRadius = "10px";
      newImage.style.margin = "auto";

      newLi.style.marginBottom = "15px";
      newLi.classList.add("d-flex");
      newLi.classList.add("flex-column");

      newLi.appendChild(newFlavor);
      newLi.appendChild(newSize);
      newLi.appendChild(newRating);
      newLi.appendChild(newImage);
      newLi.appendChild(editButton);

      this.cupcakeList.appendChild(newLi);
    });
  }

  async getAllCupcakes() {
    this.deleteButton.classList.add("invisible");
    this.cupcakeList.innerHTML = "";
    this.cupcakeFormButton.innerText = "Add Cupcake";
    const response = await axios({
      url: "http://localhost:5000/api/cupcakes",
      method: "GET",
    });
    this.cupcakeList.innerHTML = "";
    this.appendCupcakeToDOM(response.data.cupcakes);
    this.cupcakeSearchForm.style.display = "";
    this.cupcakeForm.reset();
  }

  async handleCupcakeForm(evt) {
    evt.preventDefault();
    const btn = this.cupcakeFormButton;
    if (btn.innerText === "Add Cupcake") this.addCupcake();
    if (btn.innerText === "Update Cupcake") this.updateCupcake(btn.id);
  }

  async addCupcake() {
    const response = await axios({
      url: "http://localhost:5000/api/cupcakes",
      method: "POST",
      data: {
        flavor: this.flavor.value,
        size: this.size.value,
        rating: this.rating.value,
        image: this.image.value,
      },
    });
    this.appendCupcakeToDOM([response.data.cupcake]);
    this.cupcakeForm.reset();
  }

  async editCupcake(evt) {
    if (evt.target.innerText !== "Edit Cupcake") return;
    const response = await axios({
      url: `http://localhost:5000/api/cupcakes/${evt.target.id}`,
      method: "GET",
    });

    const res = response.data.cupcake;

    this.cupcakeList.innerHTML = "";
    this.appendCupcakeToDOM([response.data.cupcake]);
    this.cupcakeFormButton.innerText = "Update Cupcake";
    this.cupcakeFormButton.id = res.id;
    this.flavor.value = res.flavor;
    this.size.value = res.size;
    this.rating.value = res.rating;
    this.image.value = res.image;
    this.cupcakeSearchForm.style.display = "none";
    this.deleteButton.classList.remove("invisible");
  }

  async updateCupcake(id) {
    const response = await axios({
      url: `http://localhost:5000/api/cupcakes/${id}`,
      method: "PATCH",
      data: {
        flavor: this.flavor.value,
        size: this.size.value,
        rating: this.rating.value,
        image: this.image.value,
      },
    });
    this.cupcakeList.innerHTML = "";
    this.appendCupcakeToDOM([response.data.cupcake]);
  }

  async deleteCupcake(evt) {
    const response = await axios({
      url: `http://localhost:5000/api/cupcakes/${this.cupcakeFormButton.id}`,
      method: "DELETE",
    });
    this.getAllCupcakes();
  }

  async searchCupcakes(evt) {
    evt.preventDefault();
    const response = await axios({
      url: "http://localhost:5000/api/cupcakes/search",
      method: "POST",
      data: {
        flavor: this.searchFlavor.value,
      },
    });
    this.cupcakeList.innerHTML = "";
    this.appendCupcakeToDOM(response.data.search_results);
  }
}

const cupcakes = new Cupcake();
