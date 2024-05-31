const express = require("express");
const router = express.Router();
const axios = require("axios");
const Planet = require("../models/Planet");

// Fetch and store planets from SWAPI
router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/planets/");
    const planets = response.data.results;

    await Planet.deleteMany(); // Clear existing data

    const savedPlanets = await Planet.insertMany(planets);
    res.json(savedPlanets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all planets with pagination and search
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const searchRegex = new RegExp(search, "i"); // Case-insensitive search
    const offset = (page - 1) * limit;

    const planets = await Planet.find({ name: { $regex: searchRegex } })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .exec();

    const count = await Planet.countDocuments({
      name: { $regex: searchRegex },
    });

    res.json({
      results: planets,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
