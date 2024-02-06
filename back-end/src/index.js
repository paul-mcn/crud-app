import express, { Request, Response } from "express";
import routes from "./routes";

const app = express();
const port = 3000;

/**
 * Test api call
 */
app.get("/ping", (req, res) => {
	res.send("pong\n");
});

app.use("/meals", routes);

app.listen(port, () => console.log(`Started CRUD app on port ${port}`));
