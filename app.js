const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello from Solitude!");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
