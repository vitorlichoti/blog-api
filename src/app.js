const express = require('express');
const { loginUser } = require('./controller/user.controller');
const { validInputs } = require('./middlewares/validateLoginInputs');

// ...

const app = express();

app.use(express.json());

app.post('/login', validInputs, loginUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
