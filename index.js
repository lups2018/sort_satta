const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
var path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    try {

        return res.render('test.ejs');

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
