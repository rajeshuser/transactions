const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./database");
const transactionRouter = require("./routers/transactionRouter");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/transactions", transactionRouter);

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Home"
	});
});

connectThenListen();

async function connectThenListen() {
	try {
		await connection;
		console.log("app is connected to database");
		await app.listen(process.env.PORT);
		console.log("app is listening at", `http://localhost:${process.env.PORT}`);
	} catch (error) {
		console.log({ error: error.message });
	}
}
