const { UserModel } = require("../models/user.model");
const {BlackModel} = require("../models/black.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    console.log(req.body)
  const { Email, Password, Confirm_Password } = req.body;

  const checkUser = await UserModel.find({ Email });

  if (checkUser.length > 0) {
    res.send({ msg: "user already exist ,please login" });
  } else {
    if (Password != Confirm_Password) {
      res.send({ msg: "Password doesn't matched" });
    } else {
      bcrypt.hash(Password, 5, async (err, hash) => {
        const user = new UserModel({ Email, Password: hash });
        await user.save();
        res.send({ msg: "User signup successfull" });
      });
    }
  }
});


userRouter.post("/login",async(req,res)=>{
     const {Email, Password} = req.body;
    const checkUser = await UserModel.find({ Email });

    if(checkUser.length==0){
        res.send({msg:"user doesn't exist ,please signup"})
    }
    else{

        bcrypt.compare(Password,checkUser[0].Password,(err,result)=>{

            if(result){

                const token = jwt.sign({userID:checkUser[0].userID},process.env.JWT_SECRET);
                res.send({msg:"Login Successful",token})

            }
            else {
                res.send({msg:"Invalid Credentials"})
            }

        })
    }

})




userRouter.get("/logout",async(req,res)=>{


    let token = req.headers.authorization.split(" ")[1]
    let black = new BlackModel({token});
    await black.save();
    res.send({msg:"logout Successful"})
})

module.exports = {
  userRouter,
};
