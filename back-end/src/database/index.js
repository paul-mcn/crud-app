import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database("./db");

try {
	const sql =
		"CREATE TABLE IF NOT EXISTS meals(id TEXT PRIMARY KEY,name,description,ingredients,image,price,rating)";
	db.run(sql);
} catch (error) {
	console.log(error);
}

export default db;
