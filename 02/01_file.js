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

module.exports = Contenedor;