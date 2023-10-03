const productModel = require('../model/productModel')

const addProduct = async(req, res) => {
    try{

        const {product_name, brand, price, quantity_sold} = req.body

        const data = new productModel({
            product_name,
            brand,
            price,
            quantity_sold
        })
        const pdata = await data.save()
        res.status(201).send({msg:"Product added", pdata})
    }catch(err){
        console.log(err);
    }
}

async function findProducts(req, res){
    try{
        const data = await productModel.find()
        res.status(200).send(data)
    }catch(err){
        res.status(500).send(err)
    }
}

async function findProduct(req, res){
    try{
        const {brand} = req.body
        const data = await productModel.findOne({brand})
        if(data != null){
            res.status(200).send(data)
        }else{
            res.status(400).send({msg:"Data not found"})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

async function updateProduct(req, res){
    try{
        const {brand} = req.params
        const {product_name, price, quantity_sold} = req.body
        const data = await productModel.updateOne({brand}, {$set:{product_name, price, quantity_sold}})
        if(data.modifiedCount > 0){
            res.status(200).send({msg:"Product updated successfully"})
        }else{
            res.status(400).send({msg:"Nothing has been modified and updated"})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

async function deleteProduct(req, res){
    try{
        const {brand} = req.params
        const data = await productModel.deleteOne({brand})
        if(data.deletedCount > 0){
            res.status(200).send({msg:"Product deleted successfully"})
        }else{
            res.status(400).send({msg:"No such document exists"})
        }
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {addProduct, findProducts, findProduct, updateProduct, deleteProduct}