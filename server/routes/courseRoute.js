const express=require("express")
const { protect } = require("../middleware/authMiddleware")
const { getCourses, createCourses, updateCourses, deleteCourses, getCourseByID } = require("../controllers/courseController")


const courseRoute=express.Router()

courseRoute.get("/",getCourses)
courseRoute.post("/",createCourses)
courseRoute.get("/:id",getCourseByID)
courseRoute.put("/:id",updateCourses)
courseRoute.delete("/:id",deleteCourses)

module.exports=courseRoute