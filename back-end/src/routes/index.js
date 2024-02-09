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
	const { name, description, ingredients, image, price, rating } = req.body;
	try {
		const { uniqueId } = await createMeal(
			name,
			description,
			ingredients,
			image,
			price,
			rating,
		);
		res.status(201).send({ createdId: uniqueId });
	} catch (error) {
		next(error);
	}
});

app.put("/update", async (req, res, next) => {
	const { id, name, description, ingredients, image, price, rating } = req.body;
	try {
		await updateMeal(id, name, description, ingredients, image, price, rating);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

app.delete("/delete/:id", async (req, res, next) => {
	try {
		await deleteMeal(req.params.id);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

export default app;
