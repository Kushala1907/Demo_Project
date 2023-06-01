const sequelize=require("../DB/db.config")
const {DataTypes}=require("sequelize")
exports.User=sequelize.define('user',{
    
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
        
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},
    {
        timestamps:false,
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    });
// (async()=> await this.User.sync())();