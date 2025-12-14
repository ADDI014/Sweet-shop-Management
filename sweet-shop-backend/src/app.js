require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");


const authRoutes = require("./routes/auth.routes");
const sweetRoutes = require("./routes/sweet.routes");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/" , (req, res) => {
    res.send("backend is running........");
});

app.use(errorHandler);

module.exports = app;

