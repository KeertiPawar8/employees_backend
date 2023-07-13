const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
      First_Name : String,
      Last_Name : String,
      Email:String,
      Department:{type:String,enum:["Tech","Marketing","Operations"]},
      Salary:Number
})

const DashModel  = mongoose.model("dashboard",dashboardSchema);

module.exports = {
    DashModel
};
