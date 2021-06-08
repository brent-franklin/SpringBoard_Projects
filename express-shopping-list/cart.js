class UserCart extends ManageItems {
  constructor() {
    // this class extends manage items and sets all of the event listeners
    super();
    this.container = document.getElementById("container");
    this.container.addEventListener("click", this.deleteFromCart.bind(this));
    this.container.addEventListener("click", this.editItem.bind(this));

    this.form = document.getElementById("form");
    this.btn = document.getElementById("btn");
    this.add = this.addToCart.bind(this);
    this.btn.addEventListener("click", this.add);

    this.cart = document.getElementById("cart");
    this.edit = this.editCart.bind(this);
    this.cart.addEventListener("click", this.refreshCart.bind(this));

    this.searchForm = document.getElementById("search-form");
    this.searchForm.addEventListener("click", this.search.bind(this));

    this.result = document.getElementById("result").lastElementChild;
  }

  // if refresh button is hit then call manageItem's getAllItems
  async refreshCart(evt) {
    evt.preventDefault();
    if (evt.target.innerText === "Refresh Cart") {
      this.cart.lastElementChild.innerHTML = "";
      const res = await this.getAllItems();
      res.forEach((item) => {
        this.addToDOM(item);
      });
    }
  }

  // if the form is filled out then send the info through manageItems addItem function
  async addToCart(evt) {
    evt.preventDefault();
    if (!this.form.item.value || !this.form.price.value) {
      return (this.result.innerText =
        "Please fill out both item name and price to enter a new item");
    }
    const res = await this.addItem(this.form.item.value, this.form.price.value);
    this.result.innerText = "Item is in the Cart";
    this.form.reset();
  }

  // if remove button is clicked send the info through manageItems deleteItem function
  async deleteFromCart(evt) {
    evt.preventDefault();
    if (evt.target.innerText === "Remove Item") {
      const res = await this.deleteItem(
        evt.target.parentElement.firstElementChild.innerText
      );
      evt.target.parentElement.remove();
    }
  }

  // if search button is clicked as long as there is a seach value it will search for the items
  // search with manageItem's getSingleItem function
  async search(evt) {
    evt.preventDefault();
    if (evt.target.innerText === "Search") {
      if (!this.searchForm.item.value) return;
      if (this.result.children) {
        this.result.innerHTML = "";
      }
      const res = await this.getSingleItem(this.searchForm.search.value);
      if (res) {
        return this.addToDOM(res, true);
      } else {
        // If no item found then inform user
        this.result.innerHTML = `No Item Found: ${this.searchForm.search.value}`;
      }
    }
  }

  // if edit button is clicked then update main form to allow edits to chosen item
  editItem(evt) {
    evt.preventDefault();
    if (evt.target.innerText === "Edit Item") {
      this.btn.removeEventListener("click", this.add);
      this.btn.addEventListener("click", this.edit);
      this.form.firstElementChild.innerText = `Edit ${evt.target.parentElement.firstElementChild.innerText}`;
      this.btn.innerText = "Update Item";
      this.form.item.value =
        evt.target.parentElement.firstElementChild.innerText;
      this.form.price.value = evt.target.previousSibling.innerText;
    }
  }

  // once edit is initiated then this is the function that updates the item in the db
  // it updates the item by removing the old one and adding the new one
  async editCart(evt) {
    evt.preventDefault();
    if (evt.target.id === "btn") {
      const res = await this.updateItem(
        this.form.item.value,
        this.form.price.value,
        evt.target.parentElement.firstElementChild.innerText
          .split(" ")
          .splice(1)
          .join(" ")
      );
      this.result.innerText = "Item Updated Successfully";
      this.cart.lastElementChild.innerHTML = "";
      res.forEach((item) => {
        this.addToDOM(item);
      });
      this.form.firstElementChild.innerText = "Add to Cart";
      this.btn.innerText = "Add to Cart";
      this.form.item.value = "";
      this.form.price.value = "";
      this.btn.removeEventListener("click", this.edit);
      this.btn.addEventListener("click", this.add);
    }
  }

  // this function is used to add an output to the result section or an element to the dom
  addToDOM(res, search = false) {
    const newLi = document.createElement("LI");
    const newH5 = document.createElement("H5");
    newH5.innerText = res.name;
    const newP = document.createElement("P");
    newP.innerText = res.price;
    const editBtn = document.createElement("BUTTON");
    editBtn.innerText = "Edit Item";
    const removeBtn = document.createElement("BUTTON");
    removeBtn.innerText = "Remove Item";
    newLi.appendChild(newH5);
    newLi.appendChild(newP);
    newLi.appendChild(editBtn);
    newLi.appendChild(removeBtn);
    search
      ? this.result.appendChild(newLi)
      : this.cart.lastElementChild.appendChild(newLi);
  }
}

const userCart = new UserCart();
