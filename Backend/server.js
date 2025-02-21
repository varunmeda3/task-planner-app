
const express=require("express");
const bcrypt= require("bcrypt");
const cors = require("cors");
const { connection } = require("./Config/db");
const { UserModel } = require("./Model/User.model");
const jwt=require("jsonwebtoken");
const {authenticationMiddleware}=require("./Middlewares/authenticationMiddleware");
const { sprintRouter } = require("./Routes/Sprint.route");
const { taskRouter } = require("./Routes/Task.route");
require('dotenv').config();
const port = process.env.PORT || 8080;
const app=express();

app.use(express.json());
app.use(cors({
    origin : "*"
}))

app.get("/",(req,res)=>{
   res.send("Hello");
});

app.post("/register",async(req,res)=>{
  let { email, password } = req.body;

  const isUserPresent = await UserModel.findOne({email});

  if(isUserPresent?.email){
            res.send({"Message":"Please try to Login first, User Already Exist"});
  }else{
    try {
        bcrypt.hash(password,3, async function(err,hash){
            const user= new UserModel({email,password:hash});
            await user.save();
            res.send({"Message":"Congratulations, SignUp Successfull"});
        });
    } catch (error) {
        console.log(error);
        res.send({"Message":"Something went wrong, Please try again later"});
    }
  }

})


app.post("/sign-in",async(req,res)=>{
     const {email,password}=req.body;
     try {
        const isUserRegisrered = await UserModel.find({email});
     
        if(isUserRegisrered.length>0){
            const hashed_pass = isUserRegisrered[0].password;
            bcrypt.compare(password,hashed_pass,function(err,result){
                if(result){
                    const token=jwt.sign({"userID":isUserRegisrered[0]._id},process.env.KEY);
                    res.send({"Message":"Log In Successfull","Token":token});
                }else{
                    res.send({"Message":"Log-In Failed. Please Enter Correct Password"});
                }
            })
        }else{
            res.send({"Message":"Log-In Failed. Please Sign Up."});
        }
    } catch (error) {
         console.log(error);
        res.send({"Message":"Something went wrong, Please try again later"})
     }
})

app.use(authenticationMiddleware);

app.use("/sprint",sprintRouter);
app.use("/task",taskRouter);

app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DataBase");
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening to port ${port}`);
})
