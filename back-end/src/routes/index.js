import express from "express";
import {
	createMeal,
	deleteMeal,
	getMeals,
	updateMeal,
} from "../util/database-util.js";

const app = express();

app.get("/", async (req, res) => {
	try {
		const meals = await getMeals();
		res.send(meals);
	} catch (error) {
		next(error);
	}
});

app.put("/create", async (req, res, next) => {
	const { name, description, ingredients, image } = req.body;
	try {
		await createMeal(name, description, ingredients, image);
		res.sendStatus(201);
	} catch (error) {
		next(error);
	}
});

app.put("/update", async (req, res, next) => {
	const { id, name, description, ingredients, image } = req.body;
	try {
		await updateMeal(id, name, description, ingredients, image);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

app.delete("/delete", async (req, res, next) => {
	try {
		await deleteMeal(req.body.id);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

export default app;
