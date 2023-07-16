const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
var path = require('path');
var bodyParser = require('body-parser')
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', async (req, res) => {
    try {
        return res.render('login.ejs');
    }
    catch (err) {
        console.log("err", err);
    }
});

app.post('/login', async (req, res) => {
    try {
        let loginData = req.body
        console.log("🚀 ~ file: index.js:26 ~ app.post ~ loginData:", loginData.username, loginData, process.env.EMAIL, process.env.PASSWORD);
        if (process.env.EMAIL === loginData.username) {
            if (process.env.PASSWORD === loginData.password) {
                req.session.loggedIn = true;
                return res.redirect('/sort');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("err", err);
    }
});

app.get('/sort', async (req, res) => {
    try {
        if (req.session.loggedIn) {
        return res.render('test.ejs');
        }
        else{
            return res.redirect('/login');
        }
    }
    catch (err) {
        console.log("err", err);
    }
});

app.get('/sortOne', async (req, res) => {
    try {

        return res.render('testOne.ejs');

    }
    catch (err) {
        console.log("err", err);
    }
});

app.get('/logout', async (req, res) => {
    try {
        req.session.loggedIn = false;
        return res.redirect('/login');

    }
    catch (err) {
        console.log("err", err);
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
