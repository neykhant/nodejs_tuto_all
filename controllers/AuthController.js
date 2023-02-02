const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, hashPassword) => {
        if (error) {
            console.log("errp", error)
            res.json({
                error: error
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
        })

        user.save()
            .then(response => {
                res.json({
                    message: "User register Successfully"
                })
            })
            .catch(error => {
                console.log("e", error);
                res.json({
                    message: "An error Occours!"
                })
            })
    })


}

const login = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password
    console.log("user", username)

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) {
                        res.json({
                            error: error
                        })
                    }

                    if (result) {
                        let token = jwt.sign({ name: user.name }, "verySecretValue", { expiresIn: '1h' })
                        res.json({
                            message: "Login Successfully",
                            token: token
                        })
                    } else {
                        res.json({
                            message: "Password does not match!"
                        })
                    }
                })
            } else {
                res.json({
                    message: "User not found!"
                })
            }
        })
        .catch(error => {
            console.log("e", error);
            res.json({
                message: "User not found!"
            })
        })
}

module.exports = {
    register, login
}


