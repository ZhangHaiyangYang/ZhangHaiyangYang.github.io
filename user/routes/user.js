const express = require('express');

const router = express.Router();
const blog = require('../moudle/blog')
router.get('/', (req, res) => {
    res.render('user');
})
router.post('/add', async (req, ress) => {
    //console.log(req.body.names);
    const cont = await blog.find({
        name: req.body.names
    });
    if (cont.length == 0) {
        new blog({
            name: req.body.names,
            desc: req.body.decs,
        }).save().then(() => {
            ress.send("注册成功<a href='/user'>点击返回登录</a>")
        })
    } else {
        // ress.send("用户已经存在<a href='/user'>点击跳转</a>");
        blog.findOne({
            name: req.body.names
        }).then((con) => {

            if (con.desc == req.body.decs) {
                ress.send("登录成功 <a href='/user'>点击跳转</a>")
            } else {
                ress.send("密码错误 <a href='/user'>点击跳转</a>")

            }
        })

    }
});
/* blog.find({
     name: req.body.names
 }).then((res, reqs) => {
     if (res.length == 0) {
         new blog({
             name: req.body.names,
             desc: req.body.decs,
         }).save().then(() => {
             ress.send("注册成功")
         })
     } else {
         ress.send("用户已经存在")
     }
 })*/


module.exports = router;