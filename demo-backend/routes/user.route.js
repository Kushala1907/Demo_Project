const exp=require("express")
const verifyToken=require("../middlewares/verifyToken")
const joiValidator=require("../middlewares/joivalidator")
const joiValidatorAddImage=require("../middlewares/joiValidatorAddImage")
const userApp=exp.Router();
const {registerUser, loginUser, addImage, getAllImages, updateImage, deleteImage, getUserImages}=require("../controllers/user.controller")
const multer=require('multer');
// const storage = require("../config/cloudinaryConfig");
// const path = require("path");
//multer
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       let ext = path.extname(file.originalname);
//       if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//         cb(new Error("Unsupported File Type"), false);
//         return;
//       } else cb(null, true);
//     },
//   });

userApp.use(exp.json())
//multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("file",file)
       return cb(null, './images/');
  },
  filename: function (req, file, cb) {
       return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage : storage  });
// const upload = multer({ dest: 'uploads/' });

//routes
userApp.post('/register-user',joiValidator,registerUser);
userApp.post('/login-user',joiValidator,loginUser);
userApp.post('/add-image/:email',verifyToken,upload.single("image_url"),addImage);
userApp.get('/get-images',getAllImages);
userApp.put('/update-image/:email',verifyToken,updateImage);
userApp.delete('/delete-image/:email/:id',verifyToken,deleteImage);
userApp.get('/get-user-images/:email',verifyToken,getUserImages);

module.exports=userApp