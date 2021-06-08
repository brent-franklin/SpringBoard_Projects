class ManageItems {
  // this is where all of the requests are sent after receiving data from the user input
  constructor() {
    this.baseURL = "http://localhost:3000/items/";
  }

  // this is used to refresh the cart
  async getAllItems() {
    const res = await axios.get(this.baseURL);
    return res.data.body;
  }

  // this is used for searching for an item in the fakeDb
  async getSingleItem(item) {
    const res = await axios.get(`${this.baseURL}/${item}`);
    return res.data.body;
  }

  // this is used to add an item to the fakeDb
  async addItem(name, price) {
    const res = await axios
      .post(`${this.baseURL}?${name}=${price}`)
      .catch((err) => {
        console.error(err.response.data.error.info);
      });
    if (res) {
      return res.data.body;
    }
  }

  // this is used to delete an item from the fakeDb
  async deleteItem(name) {
    const res = await axios.delete(`${this.baseURL}${name}`);
    return res.data.body;
  }

  // this is used to update an item by removing the old one and adding the new one
  async updateItem(name, price, oldName) {
    const res = await axios.patch(`${this.baseURL}${oldName}`, {
      name: name,
      price: price,
    });
    return res.data.db;
  }
}
