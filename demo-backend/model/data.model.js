const sequelize=require("../DB/db.config")
const {DataTypes}=require("sequelize")
exports.Data=sequelize.define('data',{
    
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
// (async()=> await this.User.sync())();