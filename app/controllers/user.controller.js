const User = global.dbHandel.getModel('user');

exports.login = (req, res) => {
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值

    console.log(222, req)

    User.findOne({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息
        if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
        } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在
            res.status(404).send('用户名不存在')
        } else {
            if (req.body.upwd != doc.password) {     //查询到匹配用户名的信息，但相应的password属性不匹配
                res.status(404).send('密码错误');
            } else {                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                // 登录成功
                res.status(200).send(doc)
            }
        }
    });
};

exports.register = (req, res) => {
    if(!req.body.upwd) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({ name: uname }, function (err, doc) {   // 同理 /login 路径的处理方式
        if (err) {
            res.status(500).send({
                message: '网络异常错误！'
            });
        } else if (doc) {
            res.status(500).send({
                message: '用户名已存在！'
            });
        } else {
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            }, function (err, doc) {
                if (err) {
                    res.status(500).send({
                        message: '异常错误！'
                    });
                    console.log(err);
                } else {
                    // console.log("查看数据", doc)
                    // 创建成功
                    res.status(200).send(doc);
                }
            });
        }
    });
};