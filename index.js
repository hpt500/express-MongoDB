const express = require("express")
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

global.dbHandel = require('./app/database/dbHandel'); // 12.09
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    //Solve DeprecationWarning
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//设置跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 用户账号体系
require('./app/routes/user.route.js')(app);
// 书籍体系
require('./app/routes/note.route.js')(app);

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome to Eas' })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})