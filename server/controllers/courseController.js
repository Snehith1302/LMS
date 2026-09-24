const Course = require("../models/course")

async function getCourses(req, res) {
    try {
        const courses = await Course.find().populate("instructor", "name email")
        return res.status(200).send(courses)
    } catch (error) {
        return res.status(500).send({
            message: "Unable to access course"
        })
    }
}

async function createCourses(req, res) {
    try {
        const { title, description, category, level, price, duration } = req.body

        if (!title || !description || !category || !level || price === undefined || !duration) {
            return res.status(400).send({
                message: "Bad Request: Missing required fields"
            })
        }
        
        const existingCourse = await Course.findOne({ title: title })
        if (existingCourse) {
            return res.status(400).send({
                message: "Bad Request, Course already exists"
            })
        }

        const course = new Course({
            title: title,
            description: description,
            instructor: req.user._id,
            category: category,
            level: level,
            price: price,
            duration: duration
        })
        
        await course.save()
        return res.status(201).send({
            message: "New course created",
            course
        })
    } catch (error) {
        console.error("ERROR CREATING COURSE:", error);
        return res.status(500).send({
            message: "Unable to create course"
        })
    }
}

async function deleteCourses(req, res) {
    try {
        const courseId = req.params.id
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        // Ensure the instructor owns the course or is an admin
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).send({
                message: "Unauthorized to delete this course"
            })
        }

        await Course.findByIdAndDelete(courseId)
        return res.status(200).send({
            message: "Course deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Unable to delete course"
        })
    }
}

async function updateCourses(req, res) {
    try {
        const courseId = req.params.id

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        // Ensure the instructor owns the course or is an admin
        if (
            course.instructor.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).send({
                message: "Unauthorized to update this course"
            })
        }

        // Fields that are allowed to be updated
        const editableFields = [
            "title",
            "description",
            "category",
            "level",
            "price",
            "duration"
        ]

        // Update only fields provided in req.body
        editableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                course[field] = req.body[field]
            }
        })

        await course.save()

        return res.status(200).send({
            message: "Course updated successfully",
            course
        })

    } catch (error) {
        console.error("ERROR UPDATING COURSE:", error)

        return res.status(500).send({
            message: "Unable to update course"
        })
    }
}


async function getCourseByID(req, res) {
    try {
        const courseId = req.params.id
        const course = await Course.findById(courseId).populate("instructor", "name email role")

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        return res.status(200).send(course)
    } catch (error) {
        return res.status(500).send({
            message: "Unable to fetch course"
        })
    }
}

module.exports = {
    getCourses,
    createCourses,
    deleteCourses,
    updateCourses,
    getCourseByID
}