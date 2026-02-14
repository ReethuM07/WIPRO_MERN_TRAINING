const {DataTypes} = require("sequelize");
const sequelize =require("../db/connection.js");

const Course=sequelize.define("Course",{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{len:[5,50]}
    },
     price:{
        type:DataTypes.FLOAT,
        allowNull:false,validate:{min:100}
    }
})
module.exports=Course;