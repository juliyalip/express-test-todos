const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
app.use(logger()); // показ. на каком маршруте что пошло не так
app.use(express.json());
app.use(cors());

app.use("/weather", require("./routes/api/weather"));
// http://localhost:3000/weather
// http://localhost:3000/weather/about

////////////////////////////////////////
app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

// module with his routers
