const express = require('express');
const app = express();
const mysql = require('mysql2');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

app.use(cors( {origin: true, credentials: true} ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes);

app.listen(port);

module.exports = app;