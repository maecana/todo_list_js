const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


// instantiate app
// initialize variables
const app = express();
const router = express.Router();


// configure path of env to config.env
dotenv.config({
    path: "./config/config.env"
});
const PORT = process.env.PORT;


// MIDDLEWARES
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname+'/index.html'));
    res.status(404).send('Page Not Found!');
});


// ROUTES
app.use((req, res, next) => {
    res.status(404).send("Page not Found!");
});


// listen on port
app.listen(PORT, (e) => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});