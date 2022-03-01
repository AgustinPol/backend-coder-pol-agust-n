const express = require("express");
const Products = require("./class/products");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const e = require("express");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

const productos = new Products(__dirname + "/data/data.json");
const messages = [];

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.get("/", (req, res) => {
  let content = productos.content;
  let haveProducts = content.length !== 0;
  return res.render("layouts/main.hbs", {
    list: content,
    showList: haveProducts,
  });
});

app.post("/", (req, res) => {
  productos.save(req.body);
  let content = productos.content;
  let haveProducts = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: haveProducts });
});

httpServer.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port: 8080");
});

/* CHAT */
io.on("connection", (socket) => {
    socket.emit("messages", messages);
  
    socket.on("new-message", (data) => {
      data.time = new Date().toLocaleString();
      messages.push(data);
      io.sockets.emit("messages", [data]);
    });
  });