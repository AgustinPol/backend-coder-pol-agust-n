const Contenedor = require("./01_file.js");

let newFile = new Contenedor("productos.txt");

let product1 = {
    title: "Camiseta Boca",
    price: 12499,
    thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw49817e04/products/AD_GA7545P/AD_GA7545P-1.JPG"
}

let product2 = {
    title: "Camiseta River",
    price: 12499,
    thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw33965a81/products/AD_GU9603/AD_GU9603-1.JPG"
}

let product3 = {
    title: "Camiseta Selección Argentina",
    price: 13499,
    thumbnail: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6d85036726614f5a9b69ab7d014920bf_9366/Camiseta_Titular_Seleccion_Argentina_Blanco_FS6565_01_laydown.jpg"
}

let product4 = {
    title: "Camiseta Racing",
    price: 11499,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_682319-MLA45741881324_042021-F.webp"
}

const fileTest = async () => {
    console.log("Listado inicial de productos: ", await newFile.getAll());
    console.log("Se agregó el producto 1: ", await newFile.save(product1));
    console.log("Se agregó el producto 2: ", await newFile.save(product2));
    console.log("Se agregó el producto 3: ", await newFile.save(product3));
    console.log("Se agregó el producto 3: ", await newFile.save(product4));
    console.log("Listado actualizado de productos: ", await newFile.getAll());
    console.log("Buscamos producto con ID no existente(null): ", await newFile.getByID(5));
    console.log("Buscamos producto con un ID existente: ", await newFile.getByID(4));
    console.log("Borramos el producto con ID 2" , await newFile.deleteByID(2));
    console.log("Listado actualizado: ", await newFile.getAll());
    // await newFile.deleteAll();
}

fileTest();