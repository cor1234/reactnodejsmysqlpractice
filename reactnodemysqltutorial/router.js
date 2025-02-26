const express =require('express');
const Router=express.Router();
const sqlDbconnect= require('./dbconnect');
Router.get("/",(req,res)=>{
    const userData=[{
        name:'Rohan',
        email:"dkhs.@gmail.com",
        age:'54'
    },
    {
        name:'Rohhi',
        email:"dkhfs.@gmail.com",
        age:'5d4'
    }
]
 res.send(userData);
});

Router.get("/api/user",(req,res)=>{
    sqlDbconnect.query("select * from tbl_user",(err,rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

Router.get("/api/country",(req,res)=>{
    sqlDbconnect.query("select * from tbl_country",(err,rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

Router.get("/api/state/:id",(req,res)=>{
    sqlDbconnect.query("select * from tbl_state where countryid='"+req.params.id+"'",(err,rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

Router.post("/api/adduser",(req,res)=>{
    //const userid= req.body.id;
    const name= req.body.name;
    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password;
    const phoneno= req.body.phoneno;
    const gender= req.body.gender;
    const countryid= req.body.countryid;
    const stateid= req.body.stateid;
    const address1= req.body.address1;
    const address2= req.body.address2;
    const accept= req.body.accept;
    const status= 1;  

    var sql=`INSERT INTO tbl_user_registration (name, username,email, password, phoneno, gender, countryid, stateid,address1, address2, accept, status)
    VALUES("${name}","${username}", "${email}" ,"${password}", "${phoneno}", "${gender}","${countryid}","${stateid}","${address1}","${address2}","${accept}", "${status}")`;
    

    sqlDbconnect.query(sql, (err, result)=>{
        if(!err)
        {
         res.status(200).json("User Registartion Inserted Successfully");
        } else{
            console.log(err);
        }

    });
})

Router.get("/api/registeruserdata",(req, res)=>{
    var sql= `SELECT ur.name, ur.username, ur.email,ur.phoneno, ur.gender, ur.address1, ur.status,c.name as countryname, s.state_name FROM tbl_user_registration as ur
    join tbl_country as c on c.id= ur.countryid
    join tbl_state as s on s.id= ur.stateid
    WHERE ur.status=1
    `;
    sqlDbconnect.query(sql, (err, row)=>{
        if(!err)
        {
            res.send(row);

        } else{
            console.log(err);
        }

    });

});


module.exports = Router;