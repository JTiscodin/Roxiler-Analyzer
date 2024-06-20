import { itemModel } from "./models";

let Item = itemModel;

const findData = async () => {
  let response = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
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
