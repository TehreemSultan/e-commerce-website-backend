const db=require("../config/db")

const getSubCategory = (req,res) =>{
    db.query(
        "SELECT * FROM subcategory",
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


const addSubCategory = (req,res) =>{
    const {name,category}=req.body;
    db.query(
        "INSERT INTO subcategory(name,category) VALUES(?,?)",[name,category]
        ,(err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"Sub Category have been successfully added"
                })
            }
        }
    );
}

const editSubCategory = (req,res) =>{
    const {id,name,category}=req.body;
    db.query(
        "UPDATE subcategory SET name=?,category=? WHERE id=?",[name,category,id]
        ,(err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"Sub Category have been successfully updated"
                })
            }
        }
    );
}

const deleteSubCategory = (req,res) =>{
    const id=req.body.id;
    db.query(
            "DELETE FROM subcategory WHERE id=?",id
                ,(err,result)=>{
                    if(err){
                        res.send({
                            message:"error occured"
                        })
                    }else{
                        res.send({
                            message:"Sub category have been successfully removed"
                        })
                    }
                }
            )
}

module.exports = {getSubCategory,addSubCategory,deleteSubCategory,editSubCategory}