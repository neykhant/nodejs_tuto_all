const express = require("express")
const router = express.Router()

const EmployeeController = require("../controllers/EmployeeController")
const upload = require("../middleware/upload")
const authenticate = require("../middleware/authenticate")

router.get("/", authenticate, EmployeeController.index)
router.get("/show", EmployeeController.show)
// router.post("/store", upload.single('avatar'), EmployeeController.store)
//this line for images as array
router.post("/store", upload.array('avatar[]'), EmployeeController.store)

router.post("/update", EmployeeController.update)
router.delete("/delete", EmployeeController.destroy)
router.get("/search/:key", EmployeeController.search)

module.exports = router