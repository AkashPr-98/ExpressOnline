const userModel = require("../model/userModel")

const addUser = async (req, res) => {

    const { first_name, last_name, age, email, password, city } = req.body

    try {
        const userData = new userModel({
            first_name,
            last_name,
            age,
            email,
            password,
            city
        })
        const data = await userData.save()
        res.status(201).send({ msg: "Data inserted successfully", data })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { addUser }