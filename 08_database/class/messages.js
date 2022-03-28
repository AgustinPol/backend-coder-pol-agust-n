const { sqlite } = require("../configDB/sqlite3");


class Messages {
    constructor(tableName){
        this.knex = require("knex")(sqlite);
        this.table = tableName;
    }

     async init(){
        try {
            const tableExist = await this.knex.schema.hasTable(this.table);
            if (!tableExist) {
              await this.knex.schema.createTable(this.table, (table) => {
                    table.increments("id").primary();
                    table.string("email",100).notNullable();
                    table.string("time",100).notNullable();
                    table.string("mensaje",255)
              });
              console.log("table created");
            } else {
              console.log("skipping creation...");
            }
          } catch (error) {
            console.log("Error in method createTable");
          }
            
    }

    async save(mensaje) {
        try {
            const data = await this.knex(this.table).insert(mensaje);
            return data;
            console.log("Saving message in DB")
        } 
        catch (error) {
            console.log("Error logging messages");
            throw error;
        }
    }


    async read(){
        try {
            const data = await this.knex.from(this.table).select("email","fecha","mensaje").orderBy("id","asc");
            return data;
        }
        catch (error) {
            console.log("Error reading messages");
            throw error;
        }
    }

    cerrarDB(){
        return this.knex.destroy();
    }
}

module.exports = Messages;