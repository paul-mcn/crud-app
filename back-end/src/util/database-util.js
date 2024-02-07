import db from "../database/index.js";
import { v4 as uuidv4 } from "uuid";
export const getMeals = () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM meals", (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
};

export const createMeal = (name, description, ingredients, image) => {
	const uniqueId = uuidv4();

	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO meals(id,name,description,ingredients,image) VALUES($id,$name,$description,$ingredients,$image)",
			{
				$id: uniqueId,
				$name: name,
				$description: description,
				$ingredients: ingredients,
				$image: image,
			},
			// Lambda function can't be used otherwise this.lastID and this.changes will be undefined.
			// Results in `resolve(rows)` being empty regardless of a sucessful INSERT
			// link: https://github.com/TryGhost/node-sqlite3/wiki/API
			function(err, rows) {
				if (err) return reject(err);
				if (this.changes === 0) return reject(new Error("Meal not created"));
				resolve(rows);
			},
		);
	});
};

export const updateMeal = (id, name, description, ingredients, image) => {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE meals SET name = $name, description = $description, ingredients = $ingredients, image = $image WHERE id = $id",
			{
				$id: id,
				$name: name,
				$description: description,
				$ingredients: ingredients,
				$image: image,
			},
			function(err) {
				if (err) return reject(err);
				if (this.changes === 0) return reject(new Error("Meal not updated"));
				resolve();
			},
		);
	});
};

export const deleteMeal = (id) => {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM meals WHERE id = $id", { $id: id }, function(err) {
			if (err) return reject(err);
			if (this.changes === 0) return reject(new Error("Meal not deleted"));
			resolve();
		});
	});
};
