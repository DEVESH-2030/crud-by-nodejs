const Userdb = require('../model/model');

// create user
exports.create = (req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content can not be enpty!"});
        return;
    }
    
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    // save use in db
    user
    .save(user)
    .then(data =>{
        // response on postman
        // res.send({message: "User created successfully", data})
        
        // response on web page
        res.redirect('/add-user');
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message || "Something went wrong while creating user"
        });
    });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "No data found"})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Something went wrong."})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "No data found." })
            })
    }
}

// update user
exports.update = (req,res)=>{
    if (!req.body){
        return res
        .status(400).send({message:"Content can not be enpty while update!"});
    }
    
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if (!data){
            res.status(404).send({message: "Not data found"})
        } else {
            res.send({message:"User updated successfully.", data})
        }
    })
    .catch(err =>{
        res.send(500).send({message: "Not updated"});
    });
}

// delete user record
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if (!data){
            res.status(404).send({message:" No data found"})
        } else {
            res.send({message: "User delete successfully."})
        }
    })
    .catch(err => {
        res.send(500).send({message: "Not deleted"});
    });
}

// get single user by id
exports.show = (req,res)=>{
    const id = req.params.id;
    Userdb.findById(id)
    .then(data => {
        if (!data){
            res.status(404).send({message:" No data found"})
        } else {
            res.send({message: "Get a user successfully.", data})
        }
    })
    .catch(err => {
        res.status(500).send({message: "No data found"});
    });
}