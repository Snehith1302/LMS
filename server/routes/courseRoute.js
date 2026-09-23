const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware");
const { getCourses, createCourses, getCourseByID, updateCourses, deleteCourses } = require("../controllers/courseController");


const courseRoute = express.Router();

courseRoute.get("/", getCourses);

courseRoute.post("/", protect, authorize('instructor', 'student'), createCourses);

courseRoute.get("/:id", getCourseByID);

courseRoute.put("/:id", protect, authorize('instructor', 'admin'), updateCourses);

courseRoute.delete("/:id", protect, authorize('instructor', 'admin'), deleteCourses);

module.exports=courseRoute