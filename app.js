const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Slope = require("./models/slope");

mongoose.connect("mongodb://localhost:27017/solitude-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("Home");
});
app.get("/slopes", async (req, res) => {
  const slopes = await Slope.find({});
  res.render("slopes/index", { slopes });
});

app.get("/slopes/:id", async (req, res) => {
  const slope = await Slope.findById(req.params.id);
  res.render("slopes/show", { slope });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
