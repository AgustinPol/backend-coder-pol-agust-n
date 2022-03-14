const fs = require("fs");
const cartPath = __dirname + "./../files/cart.json";
const productsPath = __dirname + "./../files/products.json";

const showError = (error) => {
  return {
    status: "Error",
    error: error,
  };
};

class CartHandler {
  createNewCart = async (cart) => {
    if (fs.existsSync(cartPath)) {
      try {
        const getCarts = await fs.promises.readFile(cartPath, "utf-8");
        const carts = JSON.parse(getCarts);
        if (carts.length === 0) {
          cart.id = 1;
          carts.push(cart);
          await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
          return {
            status: "Success",
            msg: "First cart created",
          };
        }
        cart.id = carts[carts.length - 1].id + 1;
        carts.push(cart);
        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
        return {
          status: "Success",
          msg: "Cart added",
        };
      } catch (error) {
        showError(error);
      }
    } else {
      try {
        cart.id = 1;
        await fs.promises.writeFile(cartPath, JSON.stringify([cart], null, 2));
        return {
          status: "Success",
          msg: "Array Created!",
        };
      } catch (error) {
        showError(error);
      }
    }
  };
  getAllCarts = async () => {
    if (fs.existsSync(cartPath)) {
      const getCart = await fs.promises.readFile(cartPath, "utf-8");
      const cart = JSON.parse(getCart);
      return {
        status: "Success",
        response: cart,
      };
    }
    return {
      status: "Error",
      msg: "This cart is empty!",
    };
  };
  deleteThisCart = async (id) => {
    if (isNaN(id))
      return {
        status: "Error",
        error: "ID must be a number",
      };
    const getCarts = await fs.promises.readFile(cartPath, "utf-8");
    const carts = JSON.parse(getCarts);
    const newCartList = carts.filter((cart) => cart.id !== parseInt(id));
    await fs.promises.writeFile(cartPath, JSON.stringify(newCartList, null, 2));
    return {
      status: "Success",
      msg: "Cart deleted",
    };
  };
  getProductsInCart = async (id) => {
    const getCarts = await fs.promises.readFile(cartPath, "utf-8");
    const carts = JSON.parse(getCarts);
    const cartFound = carts.find((cart) => cart.id === parseInt(id));
    return {
      status: "Success",
      Item: cartFound.products,
    };
  };
  addProductToCart = async (cart_id, product_id) => {
    const getCarts = await fs.promises.readFile(cartPath, "utf-8");
    const carts = JSON.parse(getCarts);
    const getProducts = await fs.promises.readFile(productsPath, "utf-8");
    const products = JSON.parse(getProducts);
    const cartFound = carts.find((cart) => cart.id === parseInt(cart_id));
    const productFound = products.find(
      (prod) => prod.id === parseInt(product_id)
    );
    cartFound.products.push(productFound.id);
    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
    return {
      status: "Success",
      msg: `${productFound.name} added to cart whit id ${cartFound.id}`,
    };
  };
  deleteProductFromCart = async (cart_id, product_id) => {
    const getCarts = await fs.promises.readFile(cartPath, "utf-8");
    const carts = JSON.parse(getCarts);
    const cartFound = carts.find((cart) => cart.id === parseInt(cart_id));
    const productList = cartFound.products;
    const filteredProductList = productList.filter(
      (num) => num !== parseInt(product_id)
    );
    cartFound.products = filteredProductList;

    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
    return {
      status: "Success",
      msg: `Item removed from cart whit id ${cartFound.id}`,
    };
  };
}

module.exports = CartHandler;
