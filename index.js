require("dotenv").config();
const express = require ('express')
const cors = require ('cors')
const app = express ()
const multer = require('multer');
const mongodb = require ('./config/mongodb')
const {getallCategoryController , categoryController} = require ('./controllers/categoryController')
const {verifyMail , forgotMail} = require ('./utils/mailSender')
const {userUpdate , allUser, getSingleUser, deleteUser, changePassword} = require ('./controllers/userController')
const { registrationController , verificationController, loginController , forgotController , resetpassController , reverificationController } = require ('./controllers/authcontroller');
const {CreateProductController , getProductByIdController , getAllProductController , getProductUpdateController , getAllPenddingProductController , getAllActiveProductController , getAllInactiveProductController ,DontgetEditInactiveProductController , getWithoutInactiveProductController , DeleteProductController } = require("./controllers/productController")
app.use(express.json())
app.use(cors())
let port = process.env.PORT || 5000
mongodb ()



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname  );
  },
});

const upload = multer({ storage: storage });






// User
app.post('/registration', registrationController);
app.post('/verification/:token', verificationController);
app.post('/login', loginController);
app.post('/forgotpass', forgotController);
app.post('/resetpass/:token', resetpassController);
app.post('/reverification', reverificationController);



//user management 
app.post('/user/:id',userUpdate);
app.get('/alluser',allUser);
app.get('/user/:id',getSingleUser);
app.delete('/user/:id', deleteUser);
app.post('/user/pass/:id', changePassword );


//create category
app.post('/create/category',categoryController);
app.get('/get/allCategory',getallCategoryController);


//CreateProduct

app.post('/createproduct', upload.array('images',5), CreateProductController);
app.get('/getproductbyid',getProductByIdController);
app.get('/getAllProduct',getAllProductController);
app.get('/Editproduct',getProductUpdateController);
app.get('/AllPendding',getAllPenddingProductController);
app.get('/AllActive',getAllActiveProductController);
app.get('/AllInactive',getAllInactiveProductController);
app.get('/DontEditInactiveProduct',DontgetEditInactiveProductController);
app.get('/WithoutInactiveProduct',getWithoutInactiveProductController);
app.delete('/deleteproduct',DeleteProductController );

app.listen(5000, ()=>{
    console.log(`Server is running PORT ${port}`);
    
})