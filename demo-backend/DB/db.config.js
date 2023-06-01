//DB
require("dotenv").config()

//import sequelize
const { Sequelize } = require('sequelize');



//create instace
const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,
    {
        host :'localhost',
        dialect:'mysql'
    }
);
sequelize.sync({force:true});
//exports 
module.exports=sequelize