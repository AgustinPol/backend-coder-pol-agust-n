const express = require("express");
const productsRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");

const app = express();
app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.get("*", (req, res) => {
  res.send({
    status: "Error",
    error: `Could not find path ${req.url}`,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running and listening on port ${PORT}`)
);
