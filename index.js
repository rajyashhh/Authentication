const express = require ('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const users = []
const JWT_SECRET_KEY = "Yashhh"

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET_KEY);
    if(decodedData.username){
        req.username = decodedData.username;
        next()
    }
    else{
        res.json({
            message : "User not logged in!"
        })
    }
}

app.post('/signup', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        "username" : username,
        "password" : password
    })
    res.json({
        message : "The user has been signed up successfully"
    })
    console.log(users);
})
app.post('/signin', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;
    let token = jwt.sign({"username": username}, JWT_SECRET_KEY);
    for(let i=0; i<users.length; i++){
        if(users[i].username==username && users[i].password==password){
            foundUser = users[i];
        }
    }
    if(foundUser){
        res.json({
           message : "This user is found in our database",
           token : token
        })
        // res.header("token", token);
    }
    else{
        res.status(400).json({ error: "No user found with such credentials" });
    }
    
})

app.get('/me', auth, (req,res)=>{
    
    
        let foundUser = null;

        for(let i=0; i<users.length; i++){
        if(users[i].username==req.username){
            foundUser = users[i];
        }
        res.json({
            username : foundUser.username,
            password : foundUser.password
        })
    }

})
app.listen(3000,console.log("Port is running on 3000"));