const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const dns = require("dns");
const courseRoute = require("./routes/courseRoute");
const authRoute = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://lms-learnly.netlify.app"
    ],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/courses", courseRoute);
app.use("/api/auth", authRoute);

// Optional test route
app.get("/", (req, res) => {
    res.send("LMS API is running");
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
