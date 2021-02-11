const express = require("express");
const ejs = require("ejs");
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

app.get("/newslope", async (req, res) => {
  const slope = new Slope({
    title: "Library",
    description: "Hill in the back of the Library",
  });
  await slope.save();
  res.send(slope);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
