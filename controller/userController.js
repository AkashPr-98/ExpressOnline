const userModel = require("../model/userModel")
const { sendMailUsingNodemailer } = require("../utils/mail")

const addUser = async (req, res) => {

    const { first_name, email, password } = req.body

    try {
        const userData = new userModel({
            first_name,
            email,
            password,
        })
        const data = await userData.save()
        res.status(201).send({ msg: "Data inserted successfully", data })
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function login(req, res) {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email, password })
        if (!user) {
            res.status(400).send({ msg: "User doesn't exist" })
        } else {
            const details = {
                to: user.email,
                subject: "Welcome Onboard",
                text: `Hello ${user.first_name}. We are glad you logged in`
            }
            sendMailUsingNodemailer(details)
            res.status(200).send({ data: user })
        }
    } catch (err) {
        res.status(500).send({ err })
    }
}

module.exports = {
    addUser,
    login
}