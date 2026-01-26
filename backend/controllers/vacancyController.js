const Vacancy = require("../models/vacancyModel");
const asyncHandler = require("express-async-handler");

// Get all vacancies
const getVacancies = asyncHandler(async (req, res) => {
	try {
		const vacancies = await Vacancy.find({});
		res.status(200).json(vacancies);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Get a vacancy by id
const getVacancy = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;

		const vacancy = await Vacancy.findById(id);
		res.status(200).json(vacancy);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Create a vacancy
const createVacancy = asyncHandler(async (req, res) => {
	try {
		const { img, place, title, desc, isActive } = req.body;

		// Check if required fields r provided
		if (!place && !title && !isActive) {
			res.status(400);
			throw new Error("Place and title r required to fill");
		}

		const createdVacancy = await Vacancy.create({
			img,
			place,
			title,
			desc,
			isActive,
		});

		res.status(200).json(createdVacancy);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Update a vacancy by id
const updateVacancy = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const { img, place, title, desc, isActive } = req.body;

		const updatedData = {
			img,
			place,
			title,
			desc,
			isActive,
		};

		// With new: true → it returns the updated document (after applying your changes).
		const updatedVacancy = await Vacancy.findByIdAndUpdate(id, updatedData, {
			new: true,
		});

		res.status(200).json(updatedVacancy);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Delete a vacancy by id
const deleteVacancy = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;

		const vacancy = await Vacancy.findByIdAndDelete(id);

		if (!vacancy) {
			res.status(404);
			throw new Error(`Cannot find any vacancy with id: ${id}`);
		}
		res.status(200).json(vacancy);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	getVacancies,
	getVacancy,
	createVacancy,
	updateVacancy,
	deleteVacancy,
};
