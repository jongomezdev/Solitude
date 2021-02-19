const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//Returns a promise because it is an async function
const seedDB = async () => {
  await Slope.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const difficulty = Math.floor(Math.random() * 10) + 1;
    const slope = new Slope({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/1728605/1600x900",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, corrupti quae rem debitis aliquam exercitationem nesciunt libero numquam harum expedita sapiente illum hic quia consequatur quibusdam similique distinctio ad doloremque totam. Itaque, nostrum asperiores? Modi odio sint natus, a nam provident aliquam corrupti similique cumque deserunt iusto ut aperiam doloribus.",
      difficulty,
    });
    await slope.save();
  }
};

// Close DB connection
seedDB().then(() => {
  mongoose.connection.close();
});
