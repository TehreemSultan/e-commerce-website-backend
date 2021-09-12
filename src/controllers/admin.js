const db=require("../config/db")
const bcrypt = require("bcrypt")
const emailsend=require("./emailsend")

const registerAdmin = async (req, res) => {

    const {name,email,number,password} = req.body;
    let hashPass;
    try{
    hashPass= await bcrypt.hash(password,10);
    }catch(err){
            console.log(err)
    }  
    db.query(
        "SELECT * FROM admins WHERE email=?",email
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
                    "INSERT INTO admins(name,email,number,password) VALUES (?,?,?,?)",[name,email,number,hashPass]
                    ,(err,result)=>{
                        console.log(err);
                        console.log(result)
                    }
                )
            }
        }
    ) 
    }

const loginAdmin = (req, res) => {

    const {email,password} = req.body;
  
    db.query(
        "SELECT * FROM admins WHERE email=?",email
        ,(err,result)=>{
            if(err){
                res.send({
                    err:err
                })
            }
            if(result.length>0){
               
              bcrypt.compare(password,result[0].password,(error,response)=>{
                   console.log("pass",password);
                    if(response){
                        res.send({
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

const gettingTempUser = (req, res) =>{
    db.query(
        "SELECT name,email,number,companyName FROM temporaryuser "
        ,(err,result)=>{
            if(err){
                res.send({
                    err:err
                })
            }else{
                res.send({
                   result:result
                })
            }
})}

const acceptingUser = (req, res) =>{
    const email=req.body.email;
    db.query(
        "SELECT * FROM temporaryuser WHERE email=?",email
        ,(err,result)=>{
            if(err){
                res.send({
                    err:err
                })
            }else{
                const {name,email,number,companyName,password}=result[0];
                db.query(
                    "INSERT INTO users(name,email,number,companyName,password) VALUES (?,?,?,?,?)",[name,email,number,companyName,password]
                    ,(err,result)=>{
                        if(err){
                            res.send({
                                message:"error occured"
                            })
                        }else{
                            emailsend(email);
                        }
                    }
                )
            }
})
}

const rejectingUser = (req, res) =>{
    const email=req.body.email;
    db.query(
            "DELETE FROM temporaryuser WHERE email=?",email
                ,(err,result)=>{
                    if(err){
                        res.send({
                            message:"error occured"
                        })
                    }else{
                        res.send({
                            message:"user have been successfully removed"
                        })
                    }
                }
            )
}



module.exports = {registerAdmin,loginAdmin,gettingTempUser,acceptingUser,rejectingUser}


