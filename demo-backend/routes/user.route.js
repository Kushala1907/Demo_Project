const exp=require("express")
const verifyToken=require("../middlewares/verifyToken")
const joiValidator=require("../middlewares/joivalidator")
const userApp=exp.Router();
const {registerUser, loginUser, addImage, getAllImages, updateImage, deleteImage, getUserImages}=require("../controllers/user.controller")

userApp.use(exp.json())
//routes
userApp.post('/register-user',joiValidator,registerUser);
userApp.post('/login-user',joiValidator,loginUser);
userApp.post('/add-image/:email',joiValidator,verifyToken,addImage);
userApp.get('/get-images',getAllImages);
userApp.put('/update-image/:email',verifyToken,updateImage);
userApp.delete('/delete-image/:email/:id',verifyToken,deleteImage);
userApp.get('/get-user-images/:email',verifyToken,getUserImages);

module.exports=userApp