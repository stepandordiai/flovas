const mongoose = require("mongoose");

const vacancySchema = mongoose.Schema(
	{
		img: { type: String, required: false },
		place: { type: String, required: true },
		title: { type: String, required: true },
		desc: { type: String, required: false },
		isActive: { type: Boolean, required: true, default: true },
	},
	{
		timestamps: true,
	}
);

const Vacancy = mongoose.model("Vacancy", vacancySchema);

module.exports = Vacancy;
