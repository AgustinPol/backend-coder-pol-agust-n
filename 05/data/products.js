const products = [
    {
      id: 1,
      title: "Mouse Logitech rosa",
      price: 2440,
      thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_2X_674801-MLA43269505256_082020-F.webp"
  
    },
    {
      id: 2,
      title: "Mouse Logitech negro",
      price: 1270,
      thumbnail:
        "https://http2.mlstatic.com/D_NQ_NP_2X_918568-MLA32146214305_092019-F.webp",
    },
    {
      id: 3,
      title: "Mouse Logitech Pebble gris",
      price: 2499,
      thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_2X_735538-MLA43269505273_082020-F.webp"
    },
    {
      id: 4,
      title: "Teclado Gamer Redragon Dark Avenger QWERTY",
      price: 4999,
      thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_2X_860827-MLA43976066837_112020-F.webp"
    },
    {
      id: 5,
      title: "Teclado Bluetooth Logitech QWERTY blanco",
      price: 3957,
      thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_2X_893318-MLA46869134984_072021-F.webp"
    },
  ];

  class Products {
    static lastProductId = products[products.length - 1].id;

    constructor() {
        this.list = products;
    }

    getAll() {
        return this.list;
    }

    getById(productId) {
        return this.list.find(product => product.id === +productId);
    }

    save(product) {
        const {title, price, thumbnail} = product;
        if (!title || !price, !thumbnail) {
            return null;
        }
        Products.lastProductId++;
        const newProduct = {
            id: Products.lastProductId,
            title,
            price,
            thumbnail
        }
        this.list.push(newProduct);
        return newProduct;
    }
}
  
  module.exports = Products;
  