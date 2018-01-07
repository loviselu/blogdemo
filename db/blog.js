const path = require('path');
const Sequelize = require('sequelize');

const dbPath = path.resolve(__dirname,'./blog.db');
const sequelize = new Sequelize(`sqlite:${dbPath}`)

//定义模型
const Blog = sequelize.define('Blog', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    title: {
        type:Sequelize.STRING
    },
    content: {
        type:Sequelize.STRING
    },
    createdAt:{
        type:Sequelize.DATE
    },
    updatedAt:{
        type:Sequelize.DATE
    }
})

sequelize.sync();

module.exports = Blog;
