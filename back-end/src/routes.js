import express, { Request, Response } from "express";
import database from "./database";

const app = express();

app.get("/", (req, res) => {
	res.send([]);
});

app.put("/create", (req, res) => {
	res.send([]);
});

app.put("/update", (req, res) => {
	res.send([]);
});

app.delete("/delete", (req, res) => {
	res.send([]);
});

export default app;
