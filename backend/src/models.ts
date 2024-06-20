import mongoose from "mongoose";

interface Item{
    id: number,
    title: string,
    price: string,
    description: string, 
    category: string,
    image: string,
    sold: boolean,
    dateOfSale: Date
}

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