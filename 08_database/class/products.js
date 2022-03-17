const fs = require('fs');

const { mariaDB } = require("../configDB/mySql");

const { sqlite } = require("../configDB/sqlite3");

class Products {
    constructor(tableName) {
        this.knex = require("knex")(mariaDB);
        this.table = tableName;
    }

   async init() {
        try {
            const tableExist = await this.knex.schema.hasTable(this.table);
            if (!tableExist) {
                 await this.knex.schema.createTable(this.table, table => {
                    table.string("title", 100).notNullable();
                    table.integer("price", 100).notNullable();
                    table.string("thumbnail", 255);
                    table.increments("id").primary();
                });
                 console.log("table created");
            } else {
                console.log("skipping creation...");
            }
		
		} 
        catch (error) {
			console.log('No hay productos cargados');
		}
        // finally {
        //     this.knex.destroy();
        // }
    }

    async save(object) {
        try {
            const data = await this.knex(this.table).insert(object);
            return data;
        } 
        catch (error) {
            console.log("error al guardar productos");
            throw error;
        }
        // finally {
        //     this.knex.destroy();
        // }
    }

    async getAll() { 
        try {
            const data = await this.knex.from(this.table).select("*");
            return data;
        }
        catch (error) {
            console.log("error al traer productos");
            throw error;
        }
        // finally {
        //     this.knex.destroy();
        // }

    }
}
module.exports = Products;