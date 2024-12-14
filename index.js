const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());

// API Endpoint
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let parsedDate;
  if (!date) {
    // No date provided, use current date
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // If date is a timestamp
    parsedDate = new Date(parseInt(date));
  } else {
    // If date is a string
    parsedDate = new Date(date);
  }

  // Check for invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the unix and utc date
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Default Endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
