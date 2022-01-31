const fs = require("fs");

class Contenedor {
    constructor (fileName) {
        this.fileName = fileName;
    }

    save = async (newProduct) => {
        const products = await this.getAll();
        if (products.length === 0) {
            newProduct.id = 1;
        } else {
            newProduct.id = products.length + 1;
        }
        products.push(newProduct);
        try {
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(products, null, 2));
            return newProduct.id;
        } catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }

    getAll = async () => {
        try {
            const products = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
            return JSON.parse(products);
        } catch (error) {
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([], null, 2));
            const products = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
            return JSON.parse(products);
        }
    }

    getByID = async (productID) => {
        try {
            const products = await this.getAll();
            let result = products.find( x => x.id === productID);
            if (result) {
                return result;
            } else {
                result = null;
                return result;
            }
        }
        catch(error) {
            console.log(`Error al retornar por id: ${error.message}`);
        }
        
    }

    deleteByID = async (thisID) => {
        let currentList = await this.getAll();
        let newList = currentList.filter( x => x.id !== thisID);
        try {
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newList, null, 2));
        } catch (error) {
            throw new Error(`Error en escritura: ${error.message}`);
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, '');
            console.log("Los productos fueron borrados");
        }
        catch(error){
            console.log(`Error al eliminar ${error.message}`);
        }
    }
}

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
    console.log("Buscamos producto con un ID existente: ", await newFile.getByID(4));
    console.log("Buscamos producto con ID no existente(null): ", await newFile.getByID(5));
    console.log("Borramos el producto con ID 2" , await newFile.deleteByID(2));
    console.log("Listado actualizado: ", await newFile.getAll());
    await newFile.deleteAll();
}

fileTest();