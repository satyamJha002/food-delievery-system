const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

const allowedOrigins = ["https://food-delievery-system.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.use("/api/user", userRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
