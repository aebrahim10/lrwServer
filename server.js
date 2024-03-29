const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const dotenv = require('dotenv');
//dotenv.config();
const PORT = process.env.PORT || 305
const app = express()

dotenv.config({ path: '.env.local' });

app.set('view engine','ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// app.get('/', (req,res)=>{
//         res.render('index',{ text : 'World'})
// })
app.get('/api', (req,res)=>{
    res.json({"users":["userOne","userTwo","userThree"]})
    console.log("Hello")
})
app.post('/a', (req,res)=>{
    const users=req.body 
    console.log("Hello009")
    console.log("users=",users)

})
app.post('/add', async(req,res)=>{
    const result=req.body 
    console.log("result=",result)
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
        
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    
})
app.post('/addUser', async(req,res)=>{
     console.log("data=",req.body)
    const newUser={
        email: req.body.email,
        password: req.body.password
    }    
    //Check if user exist in the collection allready
    const existUser = await User.findOne({email:newUser.email})
    if(existUser){
        res.send(`User with email ${newUser.email} already exist. Try again with a diffetent email.` )
    }
    else {
            //hash the password
            const saltRds=10; // number of salt round for bcrypt.
            const hPassword = await bcrypt.hash(newUser.password,saltRds);
            newUser.password = hPassword;
            try {
                const user = await User.InsertMany(newUser)
                res.status(200).json(user);
                console.log("User=",user)
                
            } catch(error){
                console.log(error.message);
                res.status(500).json({message: error.message})
            }
    }
    
})
var DB_USER = process.env.DB_USER
var DB_PASS = process.env.DB_PASS
console.log(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ozavfwl.mongodb.net/`)

const userRouter = require('./routes/users')
app.use("/users",userRouter)

mongoose.set("strictQuery", false)
//connect('mongodb://localhost:27017/DBExample')
mongoose.
 connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ozavfwl.mongodb.net/`)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT,()=>{console.log(`server runs on port ${PORT}`)})
}).catch((error) => {
    console.log(error)
})

