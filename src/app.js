const express = require('express');
const { loginUser, createUser, getUsers, getUserById } = require('./controller/user.controller');
const { createCategorie, getAllCategories } = require('./controller/category.controller');
const { validInputs } = require('./middlewares/validateLoginInputs');
const validateBody = require('./middlewares/validateCreateUserBody');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateNameCategory');
const validatePostFields = require('./middlewares/validatePostFields');
const validadeCategoriesIfExist = require('./middlewares/validadeIfExistsCategories');
const { createPost } = require('./controller/post.controller');
// const validateEmail = require('./middlewares/validadeEmail');

// ...

const app = express();

app.use(express.json());

app.get('/user/:id', validateToken, getUserById);

app.get('/user', validateToken, getUsers);

app.get('/categories', validateToken, getAllCategories);

app.post('/login', validInputs, loginUser);

app.post('/user', validateBody, createUser);

app.post('/categories', validateToken, validateName, createCategorie);

app.post('/post', validateToken, validatePostFields, validadeCategoriesIfExist, createPost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
