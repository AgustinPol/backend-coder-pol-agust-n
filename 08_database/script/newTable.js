
const { sqlite } = require('../configDB/sqlite3');
const { mariaDB } = require('../configDB/mysql');
const Products = require('../class/products');


const apiProductos = new Products(mariaDB);

apiProductos.init().then(()=> console.log('New table mySQL created!'));