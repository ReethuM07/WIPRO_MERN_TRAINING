const {DataTypes} = require("sequelize");
const sequelize =require("../db/connection.js");

const Studentss=sequelize.define("Studentss",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
     email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{isEmail:true}
    }
})
module.exports=Studentss;