const express = require("express")
require("dotenv").config();
const path = require('path')
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/userRegister")
.then(()=>{
    console.log('Database connected sucessfully....')
}).catch((err)=>{
    console.log('Something went wrong Database is not connected...', err)
})

const userRegister = require('./model/register');
const { json } = require("body-parser");

app.get('/', (req,res)=>{
    // res.send("Hello World");
    res.sendFile(path.join(__dirname, 'components', 'Register.html'))
    
})
app.get('/login', (req,res)=>{
    // res.send("Hello World");
    res.sendFile(path.join(__dirname, 'components', 'Login.html'))
    
})
app.get('/profile', (req,res)=>{
    // res.send("Hello World");
    res.sendFile(path.join(__dirname, 'components', 'Profile.html'))
    
})

// app.post('/', async(req,res)=>{
//     const userData = new userRegister(req.body)
//     // const { email, password, cpassword } = req.body
//     console.log(userData)
//     await userData.save();
//     // res.send('Data Saved sucessfully.... Special Thanks :)')
//     // alert('done')
//     res.sendFile(path.join(__dirname, 'components', 'Login.html'))
// })

app.post('/', async (req, res) => {
    const { email, password, cpassword } = req.body;
    console.log({ email, password, cpassword });

    // // Display loading state
    
    try {
        res.send('Saving data...');
        const userData = new userRegister({ email, password, cpassword });
        await userData.save();
        // Once data is saved, redirect to login page
        res.redirect('/login');
    } catch (error) {
        // Handle errors
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data. Please try again later.');
    }
});


app.post('/login', async (req,res)=>{
    const {email , password} = req.body
    // console.log(email)
    // console.log(password)
    try{
        if(!(email || password)){
            res.json({
                message:"Feild not be empty"
            })
        }
        let savedpassword;
        const euser = await userRegister.findOne({
            email
        }).then((response)=>{
            savedpassword = response.password
        })

        console.log(savedpassword);
        console.log(password)
        if(password === savedpassword){
            console.log("authentication successful")
            res.redirect('/profile')
        }else{
            res.json({
                message:'password incorrect',
                status:404
            })
        }
    }
    catch(err){
        console.log(err)
    }

})

app.listen(port, ()=>{
    console.log(`The app running on Port ${port}`)
})