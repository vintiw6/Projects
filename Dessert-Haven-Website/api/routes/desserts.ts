import express from "express";
import { Dessert } from "../models/Dessert.js";

const router = express.Router();

// GET all desserts
router.get("/", async (req, res) => {
	try {
		const desserts = await Dessert.find();
		res.json(desserts);
	} catch (err) {
		res.status(500).json({ error: "Server Error" });
	}
});

// POST a new dessert
router.post("/", async (req, res) => {
	try {
		const newDessert = new Dessert(req.body);
		await newDessert.save();
		res.json(newDessert);
	} catch (err) {
		res.status(500).json({ error: "Server Error" });
	}
});

export default router;
