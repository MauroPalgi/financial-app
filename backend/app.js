const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// ROUTES
const routePagos = require("./routes/pagos");

const { SERVER_PORT, MONGO_DB_URL } = process.env;
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/pagos", routePagos);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Conexión establecida mongoose");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://127.0.0.1:${SERVER_PORT}/`);
});
