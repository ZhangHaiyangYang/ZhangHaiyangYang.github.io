const mongoose = require('mongoose'); //导入数据库模块
const blog = require('./moudle/blog')
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useFindAndModify: false
}); //链接数据库

module.exports = {
    blog,
}