const express = require('express');
const Products = require('../class/products');
const handlebars = require('express-handlebars');
const productsApi = new Products();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Vista HBS
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views/handlebars");

app.post('/productos', (req, res) => {
    const producto = req.body;
    productsApi.save(producto);
    res.redirect('/');
})

app.get('/productos', (req, res) => {
    const prods = productsApi.getAll();

    res.render("vista", {
        products: prods,
        haveProducts: prods.length
    });
});


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listen in port ${server.address().port}`)
})
server.on("error", error => console.log(`Error in the server ${error}`))
