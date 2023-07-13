const jwt =require("jsonwebtoken")
require("dotenv").config()
const {BlackModel} = require("../models/black.model");


const authenticate = async(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1]
        if(token){
                const black = await BlackModel.find({token});
                if(black.length>0){
                    res.send({msg:"please login again"})
                }

                 else{
                           const decoded = jwt.verify(token,process.env.JWT_SECRET)
                           next();

                 }




        }
        else{
            res.send({msg:"please login again"})
        }
}


module.exports = {
    authenticate
};
