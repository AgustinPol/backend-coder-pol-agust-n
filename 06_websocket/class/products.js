const fs = require('fs')

class Products {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.init()
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('No hay productos cargados');
		}
    }

    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ 
        object["id"] = this.countID 
        this.content.push(object) 
        this.write() 
        return `El id del objeto añadido es ${this.countID}.` 
    }

    getAll() { 
        return this.content
    }

}

module.exports = Products;
