import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * Test api call
 */
app.get("/ping", (req, res) => {
	res.send("pong\n");
});

app.use("/meals", routes);

app.use((err, req, res, next) => {
	const statusCode = err.status || 500;
	const errorMessage = err.message || "Internal Server Error";

	console.error(err);

	res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => console.log(`Started CRUD app API on port ${port}`));
