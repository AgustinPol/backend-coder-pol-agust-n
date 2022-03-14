const mariaDB = {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
      database : 'ecommerce'
    }
}

module.exports = { mariaDB };