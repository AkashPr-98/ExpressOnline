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

async function userByCity(req, res){
    try{
        const actualData = await userModel.find({city:req.body.city})
        if(actualData.length > 0){
            res.status(200).send({data:actualData})
        }else{
            res.status(400).send({message:"The city you chose doesn't have any data"})
        }
    }catch(err){
        res.status(500).send({err})
    }
}

async function login(req, res){
    try{
        const {email, password} = req.body
        const data = await userModel.findOne({email, password}, {email:0, password:0})
        if(data !== null){
            res.status(200).send({actualData:data})
        }else{
            res.status(400).send({message:"This user doesn't exist"})
        }
    }catch(err){
        res.status(500).send({err})
    }
}

async function updateUser(req, res){

    const {first_name} = req.params
    const {age, city} = req.body

    try{
        const data = await userModel.updateOne({first_name}, {$set:{age, city}})
        if(data.modifiedCount > 0){
            res.status(200).send({msg:"User updated successfully"})
        }else{
            res.status(400).send({msg:"Nothing has been updated"})
        }
        
    }catch(err){
        console.log(err)
    }
}

async function deleteUser(req, res){

    const {first_name} = req.params

    try{
        const data = await userModel.deleteOne({first_name})
        if(data.deletedCount > 0){
            res.status(200).send({message:"Document deleted successfully"})
        }else{
            res.status(400).send({msg:"The document you are trying to delete doesn't exist"})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = { addUser, findUsers, userByCity, login, updateUser, deleteUser }