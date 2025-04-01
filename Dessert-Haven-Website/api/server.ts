import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import dessertRoutes from "./routes/desserts.js";

// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/desserts", dessertRoutes); // ✅ Move this after declaring `app`

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Backend is running!");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI || "", { dbName: "dessert-haven" })
	.then(() => console.log("✅ Connected to MongoDB"))
	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default app;
