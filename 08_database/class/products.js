const fs = require('fs');

const { mariaDB } = require("../configDB/mySql");

const { sqlite } = require("../configDB/sqlite3");

class Products {
    constructor() {
        this.knex = require("knex")(mariaDB);
    }

    init() {
        try {
            const tableExist = this.knex.schema.hasTable("productos");
            if (!tableExist) {
                 return this.knex.schema.createTable("productos", table => {
                    table.string("name", 100).notNullable();
                    table.integer("price", 100).notNullable();
                    table.string("thumbnail", 255);
                    table.increments("id").primary();
                });
                // console.log("table created");
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

    save(object) {
        try {
            return this.knex("productos").insert(object)
        } 
        catch (error) {
            console.log("error");
            throw error;
        }
        finally {
            this.knex.destroy();
        }
    }

    getAll() { 
        try {
            return this.knex.from("productos").select("titulo","precio","url").orderBy("id","asc");
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
