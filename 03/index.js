const express = require("express");

const Contenedor = require("../02/01_file");

let myFile = new Contenedor("productos.txt");

const PORT = process.env.PORT || 8080;

const app = express();

const getRandom = (min, max) => { // observación: el mínimo es incluido, el máximo es excluido
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get("/", (req, res) => {
    try {
        res.send("<h1 style='color: olive'>¡Bienvenidos! ¡Vean nuestros productos!</h1>");
    }
    catch (error) {
        res.send("Hubo un error al intentar mostrar título", error.message);
    }
})

app.get("/productos", async (req, res) => {
    try {
        const products = await myFile.getAll();
        res.send(products);
    }
    catch (error) {
        res.send("Hubo un error para conseguir array productos",error.message); 
    }
   
})

app.get("/productoRandom", async (req, res) => {
    try {
        const myRandom = getRandom(1, 4); 
        const randomProd = await myFile.getByID(myRandom)
        res.send(randomProd);
    }
    catch (error) {
        res.send("Hubo un error al buscar un producto Random", error.message); 
    }
       
    })

app.listen(PORT, () => {
    try {
        console.log(`servidor activo y escuchando en el puerto ${PORT}`);
    }
    catch (error) {
        console.log("Hubo un error al mostrar server", error.message)     
    }
});

