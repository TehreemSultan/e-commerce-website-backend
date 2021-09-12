const db=require("../config/db")

const getCategory = (req,res) =>{
    db.query(
        "SELECT * FROM category",
        (err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    result:result
                })
            }
        }
    );
}

const addCategory = (req,res) =>{
    const {name}=req.body;
    db.query(
        "INSERT INTO category(name) VALUES(?)",name
        ,(err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"Category have been successfully added"
                })
            }
        }
    );
}

const editCategory = (req,res) =>{
    const {id,name}=req.body;
    db.query(
        "UPDATE category SET name=? WHERE id=?",[name,id]
        ,(err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"Category have been successfully updated"
                })
            }
        }
    );
}

const deleteCategory = (req,res) =>{
    const id=req.body.id;
    db.query(
            "DELETE FROM category WHERE id=?",id
                ,(err,result)=>{
                    if(err){
                        res.send({
                            message:"error occured"
                        })
                    }else{
                        res.send({
                            message:"category have been successfully removed"
                        })
                    }
                }
            )
}

module.exports = {getCategory,addCategory,deleteCategory,editCategory}