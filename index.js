const express = require ('express');
const app = express();
app.use(express.json());

const users  = [];

function generateToken(){
    const options = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ];
    let token = "";
    for(let i = 0; i<32;i++){
        token = token + options[Math.floor(Math.random()*options.length)];
    }
    
    return token;
}
app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "You are signed up",
    })
    console.log(users);
})
app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for (let i = 0 ; i<users.length; i++){
        if(users[i].username == username && users[i].password==password){
            foundUser = users[i];
        }
    }
    if(foundUser){
        let token = generateToken();
        foundUser.token = token;
        res.json({
            token : token
        })
    }
    else{
        res.status(403).send({
            message : "User not found in the database"
        })
    }
    console.log(users);
})
app.get('/me', (req,res)=>{
    const token = req.body.token;
    let userVal = null;
    for (let i = 0 ; i<users.length; i++){
        if(users[i].token == token){
            userVal = users[i];
        }
    }
    if(userVal){
        
        res.json({
            userDetails : userVal
        })
    }
    else{
        res.status(403).send({
            message : "This token does not match with any acctive token"
        })
    }

})
app.listen(3002);