import mongoose from "mongoose";

interface Item{
    id: number,
    title: string,
    price: number,
    description: string, 
    category: string,
    image: string,
    sold: boolean,
    dateofSale: string
}

const itemSchema = new mongoose.Schema<Item>({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateofSale: String
})

export const itemModel = mongoose.model("Item", itemSchema)