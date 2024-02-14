const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await userModel.findOne({ email })

    if (!user) {
        return done(null, false, { message: "User not found with this email" })
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Invalid credentials" })
    }

    return done(null, user)
}))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id })
    return done(null, user)
})

const addUser = async (req, res) => {

    const { first_name, last_name, age, email, city, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const encryptedpassword = bcrypt.hashSync(password, salt)

    try {
        const userData = new userModel({
            first_name,
            last_name,
            age,
            email,
            password: encryptedpassword,
            city
        })
        const data = await userData.save()
        res.status(201).send({ msg: "Data inserted successfully", data })
    } catch (err) {
        res.status(400).send({ err });
    }
}

const findUsers = async (req, res) => {
    try {
        const data = await userModel.find({})
        res.status(200).send({ abc: data })
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function userByCity(req, res) {
    try {
        const actualData = await userModel.find({ city: req.body.city })
        if (actualData.length > 0) {
            res.status(200).send({ data: actualData })
        } else {
            res.status(400).send({ message: "The city you chose doesn't have any data" })
        }
    } catch (err) {
        res.status(500).send({ err })
    }
}

function login(req, res) {
    try {

        const sessionDetails = {
            sessionID: req.sessionID,
            user: req.user
        }
        res.status(200).send({ sessionDetails })
    } catch (err) {
        res.status(500).send({ err })
    }
}

function logout(req, res) {
    try {
        req.logout(function (err) {
            if (err) {
                return res.status(400).send({ message: "Error Logging out" })
            } else {
                res.status(200).send({ message: "User logged out successfully" })
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

async function findUser(req, res) {
    try {
        if (req.isAuthenticated()) {
            res.status(200).send(req.user)
        } else {
            res.status(400).send({ message: "Please login first" })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

async function findUserById(req, res) {
    try {

        const { id } = req.params

        const data = await userModel.findOne({ _id: id })
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(400).send({ message: "No such user exists" })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateUser(req, res) {

    const { id } = req.params
    const { age, city, first_name, last_name } = req.body

    try {
        const data = await userModel.updateOne({ _id: id }, { $set: { age, city, first_name, last_name } })
        if (data.modifiedCount > 0) {
            res.status(200).send({ msg: "User updated successfully" })
        } else {
            res.status(400).send({ msg: "Nothing has been updated" })
        }

    } catch (err) {
        console.log(err)
    }
}

async function deleteUser(req, res) {

    const { id } = req.params

    try {
        const data = await userModel.deleteOne({ _id: id })
        if (data.deletedCount > 0) {
            res.status(200).send({ message: "Document deleted successfully" })
        } else {
            res.status(400).send({ msg: "The document you are trying to delete doesn't exist" })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addUser,
    findUsers,
    userByCity,
    login,
    updateUser,
    deleteUser,
    findUserById,
    logout,
    findUser
}