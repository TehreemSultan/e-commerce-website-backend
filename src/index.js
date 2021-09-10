const express=require("express");
const cors = require("cors");
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");

const app=express();
app.use(cors());
app.use(express.json());
app.use("/user",user);
app.use("/admin",admin);

app.listen(3001,()=>{
    console.log('app is running on 3001....');
})

