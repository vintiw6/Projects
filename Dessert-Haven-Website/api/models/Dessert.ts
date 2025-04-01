import mongoose from "mongoose";

const DessertSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
});

export const Dessert = mongoose.model("Dessert", DessertSchema);
