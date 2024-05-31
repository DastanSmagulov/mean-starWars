const express = require("express");
const router = express.Router();
const axios = require("axios");
const Character = require("../models/Character");

// Fetch and store characters from SWAPI
router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    const characters = response.data.results;

    await Character.deleteMany(); // Clear existing data

    const savedCharacters = await Character.insertMany(characters);
    res.json(savedCharacters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
