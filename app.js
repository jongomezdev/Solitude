const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("Home");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
