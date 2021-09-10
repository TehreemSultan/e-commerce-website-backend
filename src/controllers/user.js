const db=require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const {name,email,number,companyName,password} = req.body;
    let hashPass;

    try{
    hashPass= await bcrypt.hash(password,10);
    }catch(err){
            console.log(err)
    }
    db.query(
        "SELECT * FROM users WHERE email=?",email
        ,(err,result)=>{
            if(err){
                res.send({
                    err:err
                })
            }
            if(result.length>0){
                res.send({
                    message:"email already exists"
                })
            }
            else{
                db.query(
                    "INSERT INTO temporaryuser(name,email,number,companyName,password) VALUES (?,?,?,?,?)",[name,email,number,companyName,hashPass]
                    ,(err,result)=>{
                        if(err){
                            res.send({
                                message:"error occured"
                            })
                        }else{
                            res.send({
                                message:"Your request have been successfully send"
                            })
                        }
                    }
                )
            }
        })
    }
const verifyjwt = (req,res,next)=>{
const token = req.headers["x-access-token"];
console.log("token",token)
if(!token){
    res.send("You don't have a token")
}
else{
    jwt.verify(token,"abcd",(err,decoded)=>{
       
        if(err){
            res.json({
                auth:false,
                message:"Failed to authenticate"
            })
        }
        else{
            req.userId = decoded.id
            next();
        }
    })
}
}
const viewProfile = (req,res)=>{
    res.send("wow you are authenticated")
}
const loginUser = (req, res) => {

    const {email,password} = req.body;
  
    db.query(
        "SELECT * FROM users WHERE email=?",email
        ,(err,result)=>{
            if(err){
                res.send({
                    err:err
                })
            }
            if(result.length>0){
               
              bcrypt.compare(password,result[0].password,(error,response)=>{

                    if(response){
                        const id = result[0].id;
                        
                        const token = jwt.sign({id},"abcd",{
                            expiresIn:3000
                        })
                        res.send({
                            token:token,
                            message:"successfully logged in"
                        })
                    }
                    else{
                        res.send({
                            message:"Invalid email or password"
                        })
                    }
                })
              
            }
            else{
                res.send({
                    message:"User doesn't exist"
                })
            }
        }
    )
}

module.exports = {registerUser,loginUser,viewProfile,verifyjwt}


