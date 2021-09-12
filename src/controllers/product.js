const db=require("../config/db")


const getProducts = (req,res) =>{
    db.query(
        "SELECT * FROM products",
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


const getlimitedTimeOfferProducts = (req,res) =>{
    db.query(
     "SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'l%'",
       (err,result)=>{
        
            if(err){
                console.log(err)
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

const getFeaturedProducts = (req,res) =>{
    db.query(
     "SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'f%'",
       (err,result)=>{
        
            if(err){
                console.log(err)
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

const getBestSelling = (req,res) =>{
    db.query(
     "SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'b%'",
       (err,result)=>{
        
            if(err){
                console.log(err)
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
  
const addProduct = (req,res) =>{
    const {name,origin,manufacturer,packing,paymentTerms,FOBprice,CFRprice,subcategory,status}=req.body;
    db.query(
        "INSERT INTO products(name,origin,manufacturer,packing,paymentTerms,FOBprice,CFRprice,subcategory,status) VALUES(?,?,?,?,?,?,?,?,?)",[name,origin,manufacturer,packing,paymentTerms,FOBprice,CFRprice,subcategory,status]
        ,(err,result)=>{
            if(err){
                res.send({
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"Product have been successfully added"
                })
            }
        }
    );
}

const editProduct = (req,res) =>{
    const {id,name,origin,manufacturer,packing,paymentTerms,FOBprice,CFRprice,subcategory,status}=req.body;
    db.query(
        "UPDATE products SET name=?,origin=?,manufacturer=?,packing=?,paymentTerms=?,FOBprice=?,CFRprice=?,subcategory=?,status=? WHERE id=?",[name,origin,manufacturer,packing,paymentTerms,FOBprice,CFRprice,subcategory,status,id]
        ,(err,result)=>{
            if(err){
                console.log(err);
                res.send({
                   
                    message:"error occured"
                })
            }else{
                res.send({
                    message:"product have been successfully updated"
                })
            }
        }
    );
}

const deleteProduct = (req,res) =>{
    const id=req.body.id;
    db.query(
            "DELETE FROM products WHERE id=?",id
                ,(err,result)=>{
                    if(err){
                        res.send({
                            message:"error occured"
                        })
                    }else{
                        res.send({
                            message:"product have been successfully removed"
                        })
                    }
                }
            )
}
const getlimitedTimeOfferProductsBySub = (req,res) =>{
   const {id} = req.body
    db.query(
     `SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory  INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'l%' AND subcategory.id = ${id} `,
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
const getFeaturedProductsBySub = (req,res) =>{
    const {id}= req.body
    db.query(
     `SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'f%' AND subcategory.id = ${id} `,
       (err,result)=>{
        
            if(err){
                console.log(err)
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


const getBestSellingBySub = (req,res) =>{
    const {id}= req.body
    db.query(
     `SELECT DISTINCT products.id, products.name, products.origin, products.manufacturer, products.packing,products.paymentTerms,products.FOBprice,products.CFRprice,subcategory.name AS sub_name,category.name AS cat_name FROM subcategory INNER JOIN products ON subcategory.id=products.subcategory INNER JOIN category ON subcategory.category = category.id INNER JOIN status ON products.status=status.id WHERE status.name LIKE 'b%' AND subcategory.id = ${id}`,
       (err,result)=>{
        
            if(err){
                console.log(err)
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
module.exports = {getBestSellingBySub,getProducts,getlimitedTimeOfferProducts,addProduct,editProduct,deleteProduct,getFeaturedProducts,getBestSelling,getlimitedTimeOfferProductsBySub,getFeaturedProductsBySub}