const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const EmployeeRoute = require("./routes/employee")
const AuthRoute = require("./routes/auth")

//connect to mongodb as testdb (db name)
mongoose.set("strictQuery", false);// add this for warning....
mongoose.connect('mongodb://localhost:27017/testdb',
    { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on("error", (error) => {
    console.log(error)
})

db.once("open", () => {
    console.log("Database is Created...")
})

const app = express();
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(express.json({ strict: false }))
//this.line is to look image in browser you can run localhost://8080/uploads/4434354443.jpg
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
}) 

//call employee route 
app.use("/api/employee",  EmployeeRoute)
//call register route
app.use("/api",  AuthRoute)
