const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')

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

async function login(req, res) {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email })
        const comparePassword = await bcrypt.compare(password, data.password)
        console.log("comparePassword", comparePassword);
        console.log("data", data);
        if (comparePassword) {
            res.status(200).send({ actualData: data })
        } else {
            res.status(400).send({ message: "The password is not correct" })
        }

    } catch (err) {
        res.status(500).send({ err })
    }
}

async function findUserById(req, res) {
    try {

        const { id } = req.params

        const data = await userModel.findOne({ _id: id })
            res.status(200).send(data)
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

module.exports = { addUser, findUsers, userByCity, login, updateUser, deleteUser, findUserById }