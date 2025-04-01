import mongoose from "mongoose";
import dotenv from "dotenv";
import Dessert from "./api/models/Dessert.js"; // ✅ Ensure this path is correct

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("✅ Connected to MongoDB"))
	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const seedDesserts = async () => {
	try {
		const desserts = [
			{
				name: "Chocolate Cake",
				price: 10,
				description: "Delicious chocolate cake",
			},
			{
				name: "Strawberry Cheesecake",
				price: 12,
				description: "Creamy and fruity",
			},
			{
				name: "Macarons",
				price: 8,
				description: "Assorted flavors of macarons",
			},
		];

		await Dessert.deleteMany(); // Clear existing data
		await Dessert.insertMany(desserts); // Insert new data

		console.log("✅ Database seeded successfully!");
		process.exit(); // Exit process after seeding
	} catch (error) {
		console.error("❌ Seeding Error:", error);
		process.exit(1);
	}
};

seedDesserts();
