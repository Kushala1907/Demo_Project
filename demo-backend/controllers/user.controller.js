const sequelize=require("../DB/db.config");
const expressAsyncHandler=require("express-async-handler");
const bcryptjs = require('bcryptjs');
const jwt=require("jsonwebtoken");
//import nodemailer
const nodemailer=require("nodemailer");
//import Op from sequelize
const { Op }=require('sequelize');

//create connection to smtp
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dayyubiddika095@gmail.com",
    pass: "lscsslsurjfqrtab" // app password
  }
})


//import student model
const { User }= require("../model/user.model");

//import data model
const { Data }= require("../model/data.model");


//register-user
const registerUser=expressAsyncHandler(async(req,res)=>{
    // await User.create(req.body)
    // res.status(201).send({message:"Registration successfull..."})
    try {
        let { name, email, password } = req.body;
        
        let userExists = await User.findOne({ where: { email:email } });
        console.log("user exists",userExists)
        if (userExists == undefined) {
             // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Create the user
        await User.create({ name, email, password: hashedPassword });
        res.status(201).send({ message: 'User registered successfully' });
          
        }
        else{
          res.send({ error: 'User already exists with that email' });

        }
       
      } catch (error) {
        console.error(error);
        res.send({ error: 'Failed to register user' });
      }
});

//login-user
const loginUser=expressAsyncHandler(async (req,res)=>{
    try {
        const { email, password } = req.body;
        // Check if all required properties are present in the request body
        if (!email || !password) {
          return res.status(400).send({ message: 'Please provide email and password' });
        }
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        // If user doesn't exist
        if (!user) {
          return res.status(401).send({ message: 'Invalid email or password' });
        }
        // Compare the password
        const passwordMatch = await bcryptjs.compare(password, user.password);
        // If password doesn't match
        if (!passwordMatch) {
          return res.status(401).send({ message: 'Invalid email or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Send the token and user information in the response
        res.send({
          message: 'Login successful',
          token,
          user: {  
            email: user.email  
          }
        });
      } catch (error) {
        console.error(error);
        res.send({message:error})
      }
});

//add images by authenticated user
const addImage=expressAsyncHandler(async(req,res)=>{
  
  try {
      const { day, image_url } = req.body;
      let data=req.body;
      data.email=req.params.email
      // const userExists = await User.findOne({ where: { email } });
      // if (!userExists) {
      //     return res.send({ message: 'User not exist' });
      // }
      
      // upload image
      await Data.create(data)
      
      //res.status(201).json({ message: 'Image uploaded successfully' });
      let mailOptions = {
        from: 'kushalaindia@gmail.com',
        to: req.params.email,
        subject: 'Image Uploaded',
        text: `Your image has been successfully uploaded.`
      }
    //send email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.error('Failed to send email', error);
        res.status(500).send({ error: 'Failed to send email' });
      } else {
        console.log('Email sent', info.response);
        res.status(200).send({ message: 'Image uploaded and email sent' });
      }
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to upload' });
    }
});

//update image
const updateImage=expressAsyncHandler(async(req,res)=>{
  let id=req.body.id;
  let email=req.params.email;
  let user = await User.findOne({
    where: { email: email},
  });
  if(user){
    await Data.update({image_url:req.body.image_url},{where:{[Op.and]:[{id:id},{email:email}]}})
    res.send({message:"Image updated"})
  }
  else{
    res.send({message:"Image not updated"})
  }
});

//delete image
const deleteImage=expressAsyncHandler(async(req,res)=>{
  let id=req.params.id;
  let email=req.params.email;
  let user = await User.findOne({
    where: { email: email},
  });
  if(user){
    await Data.destroy({where:{[Op.and]:[{id:id},{email:email}]}})
    res.send({message:"Image deleted"})
  }
  else{
    res.send({message:'You are not allowed to delete image'})
  }
  
});

//get all images
const getAllImages=expressAsyncHandler(async(req,res)=>{
    let images=await Data.findAll({attributes:{exclude:['id']}});
    res.status(201).send({payload:images})
});

//get images of a user
const getUserImages=expressAsyncHandler(async(req,res)=>{
  let images=await Data.findAll({where:{email:req.params.email}});
  res.status(201).send({payload:images})
  //,{where:{GDO:user.email}}
});

//export request handlers
module.exports={
    registerUser,
    loginUser,
    addImage,
    getAllImages,
    updateImage,
    deleteImage,
    getUserImages
}