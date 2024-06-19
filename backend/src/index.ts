import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { itemModel } from "./models";
import seedDatabase from "./seeder";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

const url = process.env.DATABASE_URL || "";
const port = process.env.PORT;
const Item = itemModel;

app.get("/statistics", async (req, res) => {
  //Getting search string from the body
  const { searchString } = req.body;
  console.log(searchString);
  let page = parseInt(req.query.page?.toString() || "1");
  console.log("page" + page);
  let limit = 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let response;

  //Finding users for the given searchString
  response = await Item.find({
    $or: [
      { title: { $regex: searchString, $options: "i" } },
      { description: { $regex: searchString, $options: "i" } },
    ],
  });

  console.log(response);
  res.json(response);
});

mongoose.connect(url).then(() => {
  //Seed the database
  console.log("Successfully connected to the database");
  seedDatabase();

  app.listen(port, () => {
    console.log("Server started successfully on port " + port);
  });
});
