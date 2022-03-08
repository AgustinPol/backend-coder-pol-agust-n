const express = require('express');
const router = express.Router();
const ProductsHandler = require('../class/products');
const apiProducts = new ProductsHandler();

router.get('/(:id)?', (req, res) => {
    const req_id = req.params['id'];
    if(req_id){
        apiProducts.getProductById(req_id).then(result=>res.send(result));
        return{
            status:"success",
            msg: 'this is the product you were looking for'
        }
    }
    apiProducts.getAllProducts().then(result => res.send(result));
    return{
        status:"success",
        msg: "This is the list of all products"
    }
})

router.post('/',(req,res)=>{
    const body = req.body;
    apiProducts.addProduct(body).then(result=>res.send(result));
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    if (isNaN(req_id)) return res.send({
        status: "error",
        error: "Incorrect ID"
    })
    apiProducts.deleteById(req_id).then(product => res.send(product));
})
  
module.exports = router;