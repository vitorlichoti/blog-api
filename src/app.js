const express = require('express');
const { loginUser, createUser } = require('./controller/user.controller');
const { validInputs } = require('./middlewares/validateLoginInputs');
const validateBody = require('./middlewares/validateCreateUserBody');
// const validateEmail = require('./middlewares/validadeEmail');

// ...

const app = express();

app.use(express.json());

app.post('/login', validInputs, loginUser);

app.post('/user', validateBody, createUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
