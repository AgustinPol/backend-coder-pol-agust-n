const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Products = require("./class/products");
const handlebars = require("express-handlebars");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productsApi = new Products("productos");
const messages = [];

app.use(express.static("./public"));

productsApi.init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');

  socket.emit('productos', productsApi.getAll());

  socket.on('update', producto => {
      productsApi.save(producto);
      io.sockets.emit('productos', productsApi.getAll());
  })
});



io.on("connection", (socket) => {
    socket.emit("messages", messages);
  
    socket.on("new-message", (data) => {
      data.time = new Date().toLocaleString();
      messages.push(data);
      io.sockets.emit("messages", [data]);
    });
  });

httpServer.listen(process.env.PORT || 8080, () => {
    console.log("Server running on port: 8080");
  });