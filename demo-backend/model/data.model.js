const sequelize=require("../DB/db.config")
const {DataTypes}=require("sequelize")
exports.Data=sequelize.define('data',{
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    day:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image_url:{
        type:DataTypes.STRING,
        allowNull:false
        
    }
},
    {
        timestamps:false,
        createdAt:false,
        updatedAt:false,
        freezeTableName:true
    });
 (async()=> await this.Data.sync())();