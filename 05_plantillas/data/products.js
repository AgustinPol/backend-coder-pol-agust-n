class Products {
  constructor() {
    this.items = [];
  }

  save(product) {
    const newItem = {
      id: this.items.length + 1,
      ...product,
    };
    this.items.push(newItem);
    return newItem;
  }

  getAll() {
    return this.items;
  }

}

module.exports = Products;
