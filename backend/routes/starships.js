const express = require("express");
const router = express.Router();
const axios = require("axios");
const Starship = require("../models/Starship");

// Fetch and store starships from SWAPI
router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/starships/");
    const starships = response.data.results;

    await Starship.deleteMany(); // Clear existing data

    const savedStarships = await Starship.insertMany(starships);
    res.json(savedStarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all starships
router.get("/", async (req, res) => {
  try {
    const starships = await Starship.find();
    res.json(starships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
