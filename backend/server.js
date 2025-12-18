require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const proudctRoute = require("./routes/vacancyRoute");
const dotenv = require("dotenv");
dotenv.config();
const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");
const app = express();

// List of allowed origins (admin + public site)
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:5174",
	"https://flovas-admin.netlify.app",
	"https://flovas.netlify.app",
	"https://flovas.cz",
	"https://www.flovas.cz",
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			}
		},
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/vacancies", proudctRoute);

app.get("/", (req, res) => {
	res.send("Hello Traveller...");
});

// TODO: learn this
app.get("/health", (req, res) => {
	res.status(200).send("ok");
});

app.use(errorMiddleware);

mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB database");
		app.listen(3000, () => {
			console.log(`Flovas crud web service is running on port 3000`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
