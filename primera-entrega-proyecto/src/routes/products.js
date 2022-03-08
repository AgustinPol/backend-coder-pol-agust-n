const express = require('express');
const router = express.Router();
const ProductsHandler = require('../class/products');
const apiProducts = new ProductsHandler();
const authorizationMethod = require("../../admin/authorization")


router.get('/(:id)?', (req, res) => {
    const req_id = req.params['id'];
    if(req_id){
        apiProducts.getProductById(req_id).then(result=>res.send(result));
        return{
            status:"success",
            msg: 'This is the product you were looking for'
        }
    }
    apiProducts.getAllProducts().then(result => res.send(result));
    return{
        status:"success",
        msg: "This is the list of all products"
    }
})

router.post("/", authorizationMethod, (req,res)=>{
    const body = req.body;
    apiProducts.addProduct(body).then(result => res.send(result));
})

router.put("/:id", authorizationMethod, (req, res) => {
    let id = parseInt(req.params.id);
    let product = req.body;
    apiProducts.updateProduct(id, product).then((result) => res.send(result));
})

router.delete("/:id", authorizationMethod, (req, res) => {
    const req_id = req.params["id"];
    if (isNaN(req_id)) return res.send({
        status: "error",
        error: "Incorrect ID"
    })
    apiProducts.deleteById(req_id).then(product => res.send(product));
})
  
module.exports = router;