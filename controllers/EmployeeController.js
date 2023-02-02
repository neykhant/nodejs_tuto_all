const Employee = require("../models/Employee")

//show list of employee

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occours!"
            })
        })
}

//show single employee 
const show = (req, res, next) => {
    let employeeID = req.body.employeeID

    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occours!"
            })
        })
}

//add employee to db
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        destignation: req.body.destignation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    })
    //this is for single image to save
    // if (req.file) {
    //     employee.avatar = req.file.path
    // }


    //this. is array images to save to db
    if (req.files) {
        let path = '';
        req.files.forEach(function (files, index, array) {
            path = path + files.path + ","
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar = path
    }

    employee.save()
        .then(response => {
            res.json({
                message: "Employee Add Successfully"
            })
        })
        .catch(error => {
            console.log("e", error);
            res.json({
                message: "An error Occours!"
            })
        })
}

//updated employee 
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        destignation: req.body.destignation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
        .then(response => {
            res.json({
                message: "Employee Updated Successfully"
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occours!"
            })
        })
}

//delete employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
        .then(response => {
            res.json({
                message: "Employee Delete Successfully"
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occours!"
            })
        })
}

module.exports = {
    index, store, update, destroy, show
}