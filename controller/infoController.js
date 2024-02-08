const infoModel = require('../model/infoModel')

async function addInfo(req, res){
    try{

        let state = await infoModel.findOne({state:req.body.state})

        if(!state){
            state = new infoModel({
                state: req.body.state,
                cities: []
            })
        }else{
            state.cities.push(req.body.cities)
        }

        const data = await state.save()
        return res.status(200).send({data})
    }catch(err){
        return res.status(400).send({err})
    }
}

module.exports = {addInfo}