const mongoose = require("mongoose");
const cities = require("./cities");
const Slope = require("../models/slope");

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

const seedDB = async () => {
  await Slope.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const slope = new Slope({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });
    await slope.save();
  }
};

seedDB();
