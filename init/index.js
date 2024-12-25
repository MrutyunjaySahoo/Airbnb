if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const{Db} = require("mongodb");



const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data =  initData.data.map((obj) => ({ ...obj, owner: "66cb55a9bc6915ef590cb372" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();