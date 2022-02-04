const express = require("express");
const cors = require("cors");

const startDB = require("./database");

const productRoutes = require(`./routes`);

const app = express();

app.use(express.static(`dist`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors());

app.use(`/api/v1/product`, productRoutes);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 8080;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    startDB();
    app.listen(PORT, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
  app,
};
