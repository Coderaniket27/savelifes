const express = require('express')
const app = express()
const mongoose = require('mongoose');
var cors = require('cors')
var validator = require("email-validator");

const jwt = require('jsonwebtoken');
const FormModel = require('./FormModel.js');
app.use(express.json()); // middleware
app.use(express.urlencoded({extended: true})); 
app.use(cors())
const port = process.env.PORT || 3001
const mongoURI = 'mongodb+srv://aniket:1q2w3e4r5t@cluster0.2dal9.mongodb.net/bck?retryWrites=true&w=majority';

const secret = 'your_secret_key';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((res) => {
     //console.log(res);
     
    console.log('Connected to  congo database');
  })


  function generateToken(email) {
    const payload = {
     
        id: user.id,
        email: user.email,
    };
    const options = { expiresIn: '1d' };

    return jwt.sign(payload, secret, options);
  }
  
  // This function will authenticate a user based on the JWT token
  function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }


app.get('/', (req, res) => {
    res.send('Hello World Aniket!')
  })
  app.get('/hero', (req, res) => {
    res.send('Hero beta!')
  })
  app.post('/register', async (req, res) => {
    console.log(req.body);
    const {  name, phone, email,address,query } = req.body;

    if( !name || !phone ||!address||!query) {
        return res.send({
            status: 400,
            message: "Missing data",
            data: req.body
        })
    }

    
    

    
if(query.length && address.length <5){
    return res.send({
        status: 400,
        message: "Invalid query or address",
        data: red.body
    })
}
    // Write into DB
        try {
            let email =req.body.email;
            if(validator.validate(email)){
            let formDs = await FormModel.findOne({email:email})
            console.log("hello kavya .......");
            if(formDs) {
                return res.send({
                    status: 401,
                    message: "email already taken please use another name"
                })
            }
        }
        else{

            return res.send({
                status:400,
                message: "email is not valid"
            })
        }
    }
catch(err){
    console.log(err)
   return res.send({
        status: 400,
        message: "Database   error",
        error: err
        
    })
}
let formData = new FormModel({
    name: name,

    phone: phone,
    query:query,
    address:address
    

})

if(email)
    formData.email = email;
    try {
    
        let formDb = await formData.save();

        console.log(formDb);

        res.send({
            status: 200,
            message: "Form Submmitted Successfully",
            pata: formDb
        });
    }
    catch(err) {
        console.log(err)
        res.send({
            status: 400,
            message: "Database error hai deho",
            error: err
        })
    }
})

app.post('/update', async(req, res) => {
    let name = req.body.name;
    let newData = req.body.newData;

    try {

        let oldData = await FormModel.findOneAndUpdate({name: name}, newData);
console.log(newData)
        res.send({
            status: 200,
            message: "Updated data successfully",
            data: oldData
        })
    }
    catch(err) {
        res.send({
            status: 400,
            message: "Database Error",
            error: err
        })
    }
  })
//   app.post('/login', async (req,res) => {
//     let email = req.body.email;
//     let pass=req.body.password
//     console.log(pass)

//     let search
// try {
//      search= await FormModel.findOne({email:email})
//     if(!search){
//         return res.send({
//             message:"enter email"
//         })
//     }
   
//     if (!search.email==email){
//         return res.send({
//             message:"login with correct name",
//             status:400
//         })
//     }
   
    
// }
//     catch(err){
//         return res.send({
//             message:"see problem"
//         })
//     }
// try {
//     console.log(pass)
//     if(pass==search.password){
//         return res.send({
//             message:"login successfully",
//             status:"200",
//             email:email,
//             data:search
//         })
//     }
//     else{
//         return res.send({
//             message:"enter right password",
//             status:400
//         })
//     }

    

// }
// catch(err){
//     console.log(err)
//     return res.send({
//         message:"err"
//     })
// }
// })
app.get('/protected', authenticate, (req, res) => {
    res.send({ message: `Welcome ${req.user.email}!`,
     status:"200"
});
  });
  
  // This is an example login route that generates a JWT token
  app.post('/login', (req, res) => {
    // You should validate the user's credentials before generating the token
    const Email="prakashaniket3@gmail.com"
     const Password='12345678'
    const { email, password } = req.body;
    const user = {
        id: 1,
        email: email,
      
      };

  // Check if email and password were provided in the request body
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Find the user by email address in your database or data source
 

  // If user doesn't exist or password doesn't match, return error
  if (email!=Email || password!== Password) {
    console.log(email,password)
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token and return it as a response
  const token = generateToken(user);
  res.json({ token });
  });
app.get('/dash', async(req, res) => {
    let email = req.body.email;
    let search
    try {
         search= await FormModel.findOne({email:email})
        if(!search){
            return res.send({
                message:"enter email"
            })
        }
        else{
            return res.send({
                message:"great api",
                data:search
            })
        }}
        catch(err){
            console.log(err)
            return res.send({
                message:"err"
            })
        }
    

})
    app.listen(port, () => {
    console.log(`Example app listening  aniket at http://localhost:${port}`)
  })