const express = require("express");

const { products } = require('../data/data');

const router = express.Router();

router.get("/", (req, res) => {
    try {
        let productsRes = [...products]
        res.json(productsRes);
    }
    catch (error) {
        res.json( error, `Error al traer productos`)
    }
});

router.get("/:productId", (req, res) => {
    const {productId} = req.params;
    let mySearch = products.find(p => p.id === +productId)
    if (!mySearch) {
        return res.status(404).json({ error: `¡Error! Producto ${productId} no encontrado`});
    }
    return res.json({ success: true, result: mySearch });
});

router.post("/", (req, res) => {
    const { name, price, thumbnail } = req.body;
    if ( !name || !price || !thumbnail) {
      return res.status(400).json({ error: 'Error, no es el formato correcto' });
    }
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      thumbnail
    };
    products.push(newProduct);
    return res.json({ success: true, result: newProduct });
});

router.put("/:productId", (req, res) => {
    const { params: { productId }, body: { name, price, thumbnail} } = req;
    if ( !name || !price || !thumbnail) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = products.findIndex((product) => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!`});
    const newProduct = {
      ...products[productIndex],
      name,
      price,
      thumbnail
    };
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct});
});

router.delete("/:productId", (req, res) => {
        const { productId } = req.params;
        const productIndex = products.findIndex(product => product.id === +productId);
        if (productIndex < 0) return res.status(404).json({ error: `¡Error! Producto ${productId} no encontrado`});
        products.splice(productIndex, 1);
        return res.json({ success: true, result: 'producto correctamente eliminado' });
      });   

module.exports = router;