//creating rest api
const exp=require("express")

const app=exp();

//import sequelize
const sequelize=require("./DB/db.config")


//import async express handler
const expressAsyncHandler=require("express-async-handler");

//import dotenv
require("dotenv").config()

const PORT=process.env.PORT||2222;

app.listen(PORT,()=>console.log(`htttp server running on ${PORT}...`))


//test db connection
sequelize.authenticate()
.then(()=>console.log("DB connecion success"))
.catch(err=>console.log("err in db connection ",err))

app.use(exp.json());

sequelize.sync();

//connecting build of react app with nodejs web server
const path=require("path")
app.use(exp.static(path.join(__dirname,'../build')))

//import route
const userApp=require("./routes/user.route")
app.use("/user-api",userApp)

//page refresh
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"../build/index.html"))
})

//invalid path
app.use('*',(req,res,next)=>{
    res.send({message:"Invalid Path"})
})

//default handler
app.use((err,req,res,next)=>{
   
    res.send({errMsg:err.message})
})
