const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const dns = require("dns")
const courseRoute = require("./routes/courseRoute")
const authRoute = require("./routes/authRoutes")
const cors = require('cors')

dotenv.config()
dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express()

// 1. Enable CORS and JSON parsing before your routes
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

// 2. Routes
app.use("/api/courses", courseRoute)
app.use("/api/auth", authRoute)

connectDB()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})