const express = require('express');
const { ENV: { PORT } } = require('./config');
const apiRoutes = require('./routers/index');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use('/api', apiRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${server.address().port}`);
})
server.on("error", error => console.log(`Error in the server ${error}`));
