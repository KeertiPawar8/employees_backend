const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes");
const {empRouter} = require("./routes/Dashboard.routes")
const app = express();
app.use(cors())
app.use(express.json());


app.use("/",userRouter)
app.use("/",empRouter)




app.listen(process.env.port,async()=>{
    await connection
    console.log(`Server is running at port ${process.env.port}`)
})
