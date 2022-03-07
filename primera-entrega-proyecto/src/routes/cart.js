const express = require('express');
const momentjs = require('moment');
const moment = momentjs();
const router = express.Router();
const CartHandler = require('../class/cart');
const apiCart = new CartHandler();

router.get('/', (req, res) => {
    apiCart.getAllCarts().then(cart => res.send(cart));
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    apiCart.deleteOneProduct(req_id).then(cart => res.send(cart))
})

router.post('/', (req, res) => {
    const body = {
        timestamp: moment.format('DD/MM/YYYY hh:mm:ss a'),
        products: [],
    }
    apiCart.createCart(body).then(cart=>res.send(cart))
})

router.get('/:id/productos', (req, res) => {
    const cart_id= req.params['id'];
    apiCart.getProductsInCart(cart_id).then(cart=>res.send(cart));
})

router.post('/:id/productos/:id_prod',(req,res)=>{
    const cart_id = req.params['id'];
    const prod_id = req.params['id_prod'];
    apiCart.addProductToCart(cart_id,prod_id).then(result=>res.send(result));
})

router.delete('/:id/productos/:id_prod',(req,res)=>{
    const cart_id = req.params['id'];
    const prod_id = req.params['id_prod'];
    apiCart.deleteProductFromCart(cart_id,prod_id).then(result=>res.send(result));
})
module.exports = router;