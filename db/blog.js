const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

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
