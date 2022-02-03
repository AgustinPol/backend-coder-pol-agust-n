const express = require("express");

const Contenedor = require("../02/01_file");

let myFile = new Contenedor("productos.txt");

const PORT = process.env.PORT || 8080;

const app = express();

const getRandom = (min, max) => { // observación: el mínimo es incluido, el máximo es excluido
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get("/", (req, res) => {
    res.send("<h1 style='color: olive'>¡Bienvenidos! ¡Vean nuestros productos!</h1>");
})

app.get("/productos", async (req, res) => {
    const products = await myFile.getAll();
    res.send(products);
})

app.get("/productoRandom", async (req, res) => {
    const myRandom = getRandom(1, 4); 
    const randomProd = await myFile.getByID(myRandom)
    res.send(randomProd);    
    })

app.listen(PORT, () => {
    console.log(`servidor activo y escuchando en el puerto ${PORT}`);
});

