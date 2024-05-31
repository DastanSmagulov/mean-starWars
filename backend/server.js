const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const Character = require("./models/Character");
const characterRoutes = require("./routes/characters");
const planetRoutes = require("./routes/planets");
const starshipRoutes = require("./routes/starships");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/swapi";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

app.use("/api/characters", characterRoutes);
app.use("/api/planets", planetRoutes);
app.use("/api/starships", starshipRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
