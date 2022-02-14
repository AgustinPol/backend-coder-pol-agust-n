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
    return res.json({ info: "¡Producto Encontrado con éxito!", result: mySearch });
});

router.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    if ( !title || !price || !thumbnail) {
      return res.status(400).json({ error: 'Error, formato incorrecto' });
    }
    const newProduct = {
      id: products.length + 1,
      title,
      price,
      thumbnail
    };
    products.push(newProduct);
    return res.json({ success: true, result: newProduct });
});

router.put("/:productId", (req, res) => {
    const { params: { productId }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
      return res.status(400).json({ error: 'Error, formato incorrecto' });
    };
    const productIndex = products.findIndex((p) =>p.id === +productId);
    if (productIndex < 0) return res.status(404).json({ error: `¡El producto que quiere actualizar (${productId}) no existe!`});
    const newProduct = {
      ...products[productIndex],
      title,
      price,
      thumbnail
    };
    products[productIndex] = newProduct;
    return res.json({ info: "Producto correctamente actualizado", result: newProduct});
});

router.delete("/:productId", (req, res) => {
        const { productId } = req.params;
        const productIndex = products.findIndex(p => p.id === +productId);
        if (productIndex < 0) return res.status(404).json({ error: `¡Error! Producto ${productId} no encontrado`});
        products.splice(productIndex, 1);
        return res.json({ result: `Producto ${productId} correctamente eliminado` });
      });   

module.exports = router;