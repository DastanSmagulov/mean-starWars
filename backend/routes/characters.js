const express = require("express");
const router = express.Router();
const axios = require("axios");

// Fetch and store characters from SWAPI
router.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    const characters = response.data.results;
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Proxy to fetch characters with pagination from SWAPI
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1 } = req.query;
    let url = `https://swapi.dev/api/people/?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    const response = await axios.get(url);
    const results = response.data.results;
    const count = response.data.count;
    const totalPages = Math.ceil(count / 10);
    const currentPage = parseInt(page, 10);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;

    res.json({
      results,
      totalPages,
      currentPage,
      next: nextPage
        ? `http://localhost:5000/api/characters?page=${nextPage}&search=${search}`
        : null,
      previous: previousPage
        ? `http://localhost:5000/api/characters?page=${previousPage}&search=${search}`
        : null,
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
