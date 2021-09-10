const mysql=require("mysql");
const db=mysql.createConnection({  host: 'localhost',
port:'8111',
database: 'e-commerce',
user:'root',});

module.exports=db;