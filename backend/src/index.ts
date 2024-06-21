import express, { query } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { itemModel } from "./models";
import seedDatabase from "./seeder";
import { Months } from "./types";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

const url = process.env.DATABASE_URL || "";
const port = process.env.PORT || 5000;
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

app.get("/getmultipledata", async (req, res) => {
  const searchString = req.query.search?.toString() || "";
  let page = parseInt(req.query.page?.toString() || "1");
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  const monthNumber = monthMap.get(Months[month]) ?? 3;

  const data = await fetch(
    "http://localhost:5000/listdata?page=" +
      page +
      "&search=" +
      searchString +
      "&month=" +
      month
  );

  const filteredData = await data.json();

  const barchart = await fetch("http://localhost:5000/barchart?month=" + month);

  const barChartData = await barchart.json();

  const stats = await fetch("http://localhost:5000/statistics?month=" + month);

  const statisticsData = await stats.json();

  const piechart = await fetch("http://localhost:5000/piechart?month=" + month)

  const pieChartData = await piechart.json()


  res.status(200).json({
    filteredData,
    barChartData,
    statisticsData,
    pieChartData
  });
});

app.get("/listdata", async (req, res) => {
  //Getting search string from the body
  const searchString = req.query.search?.toString() || "";
  let page = parseInt(req.query.page?.toString() || "1");
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  let limit = 10;
  const startIndex = (page - 1) * limit;

  //conveting the month to date format to query the database
  const monthNumber = monthMap.get(Months[month]) ?? 3;

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
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    },
    ["-_id", "-__v", "-dateOfSale"]
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

//Get statistics
app.get("/statistics", async (req, res) => {
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  const monthNumber = monthMap.get(Months[month]) ?? 3;

  const totalRevenue = await Item.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        sold: true,
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $toDouble: "$price" } },
      },
    },
  ]);

  const totalUnsoldItems = await Item.countDocuments({
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    sold: false,
  });

  const totalSoldItems = await Item.countDocuments({
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    sold: true,
  });

  res.status(200).json({
    totalRevenue: totalRevenue[0]?.total || 0,
    totalSoldItems,
    totalUnsoldItems,
  });
});

app.get("/barchart", async (req, res) => {
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  const monthNumber = monthMap.get(month) ?? 3;

  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  const data = await Promise.all(
    priceRanges.map(async (range) => {
      const count = await Item.countDocuments({
        price: { $gte: range.min.toString(), $lt: range.max.toString() },
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      });
      return { range: `${range.min} - ${range.max - 1}`, count };
    })
  );

  res.status(200).json(data);
});

//Get pie chart Data
app.get("/piechart", async (req, res) => {
  const month: Months = (req.query.month?.toString() as Months) || Months.March;
  const monthNumber = monthMap.get(month) ?? 3;

  const categoryData = await Item.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  res.status(200).json(categoryData);
});

mongoose.connect(url).then(() => {
  //Seed the database
  console.log("Successfully connected to the database");
  seedDatabase();

  app.listen(port, () => {
    console.log("Server started successfully on port " + port);
  });
});
