const express = require('express');
const router = express.Router();
router.use(logger)

router.get('/',(req,res)=>{
    var a = req.query.name
    res.send('List Users'+ a)
})
router.get('/new',(req,res)=>{
    res.render("users/new",{ firstName:'Test'})
})
router.post("/",(req,res)=>{
    const isValid=false
    if (isValid){
        users.push({firstName:req.body.firstName})
        res.redirect(`users/${users.length -1}`)
    }else{
        console.log(Error)
        res.render("users/new",{firstName:req.body.firstName})

    }
    
})
router.route("/:id")
.get((req,res)=>{
    console.log(req.user)
    res.send(`get user by id ${req.params.id}`)
})
.put((req,res)=>{
    res.send(`Update user by id ${req.params.id}`)
})
.delete((req,res)=>{
    res.send(`Delete user by id ${req.params.id}`)
})
const users = [{name:'Souad'},{name:'Sarah'}]
router.param("id",(req,res,next,id)=>{
    req.user=users[id]
    console.log("paramId=",id)
    next()
})
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}


module.exports = router
