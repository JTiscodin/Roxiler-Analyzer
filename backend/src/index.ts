import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { itemModel } from "./models";
import seedDatabase from "./seeder";
import { Months } from "./types";
import moment from "moment";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

const url = process.env.DATABASE_URL || "";
const port = process.env.PORT;
const Item = itemModel;

const monthMap = new Map([
  ["January", 1],
  ["February", 2],
  ["March", 3],
  ["April", 4],
  ["May", 5],
  ["June", 6],
  ["July", 7],
  ["August", 8],
  ["September", 9],
  ["October", 10],
  ["November", 11],
  ["December", 12],
]);

app.get("/statistics", async (req, res) => {
  //Getting search string from the body
  const searchString = req.query.search?.toString() || "";
  let page = parseInt(req.query.page?.toString() || "1");
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  let limit = 10;

  console.log(Months[month]);
  const startIndex = (page - 1) * limit;

  //conveting the month to date format to query the database
  const monthNumber = monthMap.get(Months[month]) ?? 3;

  const startOfMonth = moment()
    .month(monthNumber - 1)
    .startOf("month")
    .toDate();
  const endOfMonth = moment()
    .month(monthNumber - 1)
    .endOf("month")
    .toDate();

  console.log(startOfMonth, endOfMonth);

  let response;

  //Finding users for the given searchString and modifying the request according to page number.
  response = await Item.find(
    {
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } },
        { price: { $regex: searchString, $options: "i" } },
      ],
      //Creating a query to return the items of the specified months 
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    },
    ["-_id", "-__v"]
  )
    .limit(limit)
    .skip(startIndex)
    .exec();

  //sending in the response as well as the page number.
  res.status(200).json({
    response,
    page,
  });
});

mongoose.connect(url).then(() => {
  //Seed the database
  console.log("Successfully connected to the database");
  seedDatabase();

  app.listen(port, () => {
    console.log("Server started successfully on port " + port);
  });
});
