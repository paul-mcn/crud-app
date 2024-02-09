import db from "../database/index.js";
import { v4 as uuidv4 } from "uuid";
export const getMeals = () => {
	return new Promise((resolve, reject) => {
		db.all("SELECT * FROM meals", (err, meals) => {
			if (err) return reject(err);
			resolve(
				meals.map((meal) => ({
					...meal,
					price: parseFloat(meal.price), 
					rating: parseFloat(meal.rating),
				})),
			);
		});
	});
};

export const createMeal = (
	name,
	description,
	ingredients,
	image,
	price,
	rating,
) => {
	const uniqueId = uuidv4();

	return new Promise((resolve, reject) => {
		db.run(
			"INSERT INTO meals(id,name,description,ingredients,image,price,rating) VALUES($id,$name,$description,$ingredients,$image,$price,$rating)",
			{
				$id: uniqueId,
				$name: name,
				$description: description,
				$ingredients: ingredients,
				$image: image,
				$price: price,
				$rating: rating,
			},
			// Lambda function can't be used otherwise this.lastID and this.changes will be undefined.
			// Results in `resolve(rows)` being empty regardless of a sucessful INSERT
			// link: https://github.com/TryGhost/node-sqlite3/wiki/API
			function(err) {
				if (err) return reject(err);
				if (this.changes === 0) return reject(new Error("Meal not created"));
				resolve({ uniqueId });
			},
		);
	});
};

export const updateMeal = (
	id,
	name,
	description,
	ingredients,
	image,
	price,
	rating,
) => {
	return new Promise((resolve, reject) => {
		db.run(
			"UPDATE meals SET name = $name, description = $description, ingredients = $ingredients, image = $image, price = $price, rating = $rating WHERE id = $id",
			{
				$id: id,
				$name: name,
				$description: description,
				$ingredients: ingredients,
				$image: image,
				$price: price,
				$rating: rating,
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
