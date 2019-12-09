module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // 登录
    app.post('/login', users.login);

    // 登出

    // 注册
    app.post('/register', users.register);

    // 账号详情
    // app.get('/user/:userId', users.detail);

    // 修改账号信息
    // app.put('/user/:userId', users.update);

    // 注销账号
    // app.delete('/user/:userId', users.delete);
}