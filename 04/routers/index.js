const express = require("express");
const productsRoutes = require("./products.routes");
const router = express.Router();

//middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true})); 

//routes
router.use("/productos", productsRoutes);

module.exports = router;