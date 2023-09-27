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
        res.status(400).send({err});
    }
}

const findUsers = async(req, res) => {
    try{
        const data = await userModel.find({}, {first_name:1, last_name:1, age:1, _id:0})
        res.status(200).send({data})
    }catch(err){
        res.status(500).send({err})
    }
}

module.exports = { addUser, findUsers }