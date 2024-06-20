import mongoose from "mongoose";
import { Item } from "./types";

const itemSchema = new mongoose.Schema<Item>({
    id: Number,
    title: String,
    price: String,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
})

export const itemModel = mongoose.model("Item", itemSchema)