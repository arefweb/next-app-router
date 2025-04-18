const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const router = require("./routes");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// gzip compression
app.use(compression());

// enable cors
app.use(cors());

app.use("/api", router);

module.exports = app;