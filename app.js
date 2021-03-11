const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const methodOverride = require("method-override");
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("Home");
});

app.get(
  "/slopes",
  catchAsync(async (req, res) => {
    const slopes = await Slope.find({});
    res.render("slopes/index", { slopes });
  })
);

app.get("/slopes/new", (req, res) => {
  res.render("slopes/new");
});

app.post(
  "/slopes",
  catchAsync(async (req, res, next) => {
    const slope = new Slope(req.body.slope);
    await slope.save();
    res.redirect(`/slopes/${slope._id}`);
  })
);

app.get(
  "/slopes/:id",
  catchAsync(async (req, res) => {
    const slope = await Slope.findById(req.params.id);
    res.render("slopes/show", { slope });
  })
);

app.get(
  "/slopes/:id/edit",
  catchAsync(async (req, res) => {
    const slope = await Slope.findById(req.params.id);
    res.render("slopes/edit", { slope });
  })
);

app.put(
  "/slopes/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const slope = await Slope.findByIdAndUpdate(id, { ...req.body.slope });
    res.redirect(`/slopes/${slope._id}`);
  })
);

app.delete(
  "/slopes/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Slope.findByIdAndDelete(id);
    res.redirect("/slopes");
  })
);

app.use((err, req, res, next) => {
  res.send("Something went wrong!");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
