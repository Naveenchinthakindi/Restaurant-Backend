const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const categoryRoute = require("./routes/categoryRoute");
const foodRoute = require("./routes/foodRoute");
const connectDb = require("./config/db");

//rest object
const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = 5000;

connectDb();

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to node js </h1>");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/category", categoryRoute);
app.use("/api/food", foodRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
