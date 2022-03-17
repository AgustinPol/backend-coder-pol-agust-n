const fs = require('fs');

const { mariaDB } = require("../configDB/mySql");

const { sqlite } = require("../configDB/sqlite3");

class Products {
    constructor() {
        this.knex = require("knex")(mariaDB);
    }

   async init() {
        try {
            const tableExist = await this.knex.schema.hasTable("productos");
            if (!tableExist) {
                 await this.knex.schema.createTable("productos", table => {
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
        finally {
            this.knex.destroy();
        }
    }

    async save(object) {
        try {
            await this.knex("productos").insert(object)
        } 
        catch (error) {
            console.log("error");
            throw error;
        }
        finally {
            this.knex.destroy();
        }
    }

    async getAll() { 
        try {
            await this.knex.from("productos").select("title","price","thumbnail").orderBy("id","asc");
        }
        catch (error) {
            console.log("error");
            throw error;
        }
        finally {
            this.knex.destroy();
        }

    }
}
module.exports = Products;