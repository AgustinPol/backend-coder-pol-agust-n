const fs = require("fs");
const productsPath = __dirname + "./../files/products.json";

const showError = (error) => {
  return {
    status: "Error",
    error: error,
  };
};

class ProductsHandler {
  getAllProducts = async () => {
    if (fs.existsSync(productsPath)) {
      try {
        const getProducts = await fs.promises.readFile(
          productsPath,
          "utf-8",
          null,
          2
        );
        const products = JSON.parse(getProducts);
        return {
          status: "Success",
          response: products,
        };
      } catch (error) {
        showError(error);
      }
    }
  };
  addProduct = async (product) => {
    if (fs.existsSync(productsPath)) {
      try {
        const getProducts = await fs.promises.readFile(productsPath, "utf-8");
        const products = JSON.parse(getProducts);
        if (products.length === 0) {
          product.id = 1;
          products.push(product);
          await fs.promises.writeFile(
            productsPath,
            JSON.stringify(products, null, 2)
          );
          return {
            status: "Success",
            msg: "First product added",
          };
        }

        product.id = products[products.length - 1].id + 1;
        products.push(product);
        await fs.promises.writeFile(
          productsPath,
          JSON.stringify(products, null, 2)
        );
        return {
          status: "Success",
          msg: "Product added!",
        };
      } catch (error) {
        showError(error);
      }
    } else {
      try {
        product.id = 1;
        await fs.promises.writeFile(
          productsPath,
          JSON.stringify([product], null, 2)
        );
        return {
          status: "Success",
          msg: "Array Created!",
        };
      } catch (error) {
        showError(error);
      }
    }
  };
  deleteById = async (id) => {
    if (!id) {
      return {
        status: "Error",
        error: "ID missing",
      };
    }
    if (isNaN(id)) {
      return {
        status: "Error",
        error: "ID is not a number",
      };
    }
    const getProducts = await fs.promises.readFile(productsPath, "utf-8");
    const products = JSON.parse(getProducts);
    const deletedProduct = products.filter((x) => x.id !== parseInt(id));
    await fs.promises.writeFile(
      productsPath,
      JSON.stringify(deletedProduct, null, 2)
    );
  };
  updateProduct = async (id, updatedProduct) => {
    if (!id) {
      return {
        status: "Error",
        error: "ID missing",
      };
    }
    if (isNaN(id)) {
      return {
        status: "Error",
        error: "ID is not a number",
      };
    }
    if (fs.existsSync(productsPath)) {
      try {
        const getProducts = await fs.promises.readFile(productsPath, "utf-8");
        const products = JSON.parse(getProducts);
        const newProducts = products.map((prod) => {
          if (prod.id === parseInt(id)) {
            updatedProduct.id = id;
            return updatedProduct;
          } else {
            return prod;
          }
        });
        await fs.promises.writeFile(
          productsPath,
          JSON.stringify(newProducts, null, 2)
        );
        return {
          status: "Success",
          msg: "Product updated",
        };
      } catch (error) {
        showError(error);
      }
    }
  };
  getProductById = async (id) => {
    if (isNaN(id))
      return {
        status: "Error",
        error: "ID must be a number",
      };

    const getProducts = await fs.promises.readFile(productsPath, "utf-8");
    const products = JSON.parse(getProducts);
    const productFound = products.find((prod) => prod.id === parseInt(id));
    if (productFound)
      return {
        status: "Success",
        msg: productFound,
      };
  };
}

module.exports = ProductsHandler;

    getProductById = async (id) => {
        if (isNaN(id))
            return {
                status: "Error",
                error: "ID must be a number"
            }

        const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
        const products = JSON.parse(getProducts);
        const productFound = products.find(prod => prod.id === parseInt(id));
        if (productFound) return {
            status: "Success",
            msg: productFound
        }
    }


module.exports = ProductsHandler;