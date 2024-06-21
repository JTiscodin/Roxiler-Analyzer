import { itemModel } from "./models";
import dotenv from "dotenv";

dotenv.config()

let Item = itemModel;

const findData = async () => {
  let response = await fetch(
    process.env.SEED_DATABASE_URL || ""
  );

  let data = await response.json();
  return data;
};

const seedDatabase = async () => {
  try {
    //deleting past entires
    await Item.deleteMany({});

    //fetching data
    let results = await findData();

    //Inserting / Seeding new data
    await Item.insertMany(results);
  } catch (e) {
    console.log(e);
  }
};

export default seedDatabase;
