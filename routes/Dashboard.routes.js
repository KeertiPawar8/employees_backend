const express =require("express")
const empRouter = express.Router();

const {DashModel} = require("../models/Dashboard.model")
const {authenticate} = require("../middlewares/authenticate")

 empRouter.use(authenticate)

empRouter.post("/employees",async(req,res)=>{

const employee = new DashModel({...req.body})
employee.save();
res.send({msg:"New Employee Added"})

})

empRouter.get("/getdata",async(req,res)=>{
    const employee =await DashModel.find()  
    res.send(employee)    
    })

    empRouter.delete("/delete/:id",async(req,res)=>{
        const id =req.params.id
         
        await DashModel.findByIdAndDelete({_id:id})  
        res.send({msg:"employee has been deleted"})    
        })

 module.exports = {
    empRouter
 };
 



//  {
//     "First_Name":"keerti",
//     "Last_Name":"pawar",
//     "Email":"keerti@gmail.com",
//     "Department":"Tech",
//     "Salary":45000
   
 
//    }


// {
//     "Email":"vinay@gmail.com",
//     "Password":"vinay"
    
//   }
  

// {
//     "First_Name":"vinay",
//     "Last_Name":"vinay",
//     "Email":"vinay@gmail.com",
//     "Department":"Tech",
//     "Salary":55000
   
 
//    }