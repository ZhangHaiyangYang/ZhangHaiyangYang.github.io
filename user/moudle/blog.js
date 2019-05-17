const mongoose = require('mongoose'); //导入数据库模块
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useFindAndModify: false
}); //链接数据库

const type = mongoose.Schema;
const blogtype = new type({
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    }
})
const blog = mongoose.model('blog_data', blogtype);
module.exports = blog;