const express = require('express');
const { loginUser, createUser,
  getUsers, getUserById, removeUser } = require('./controller/user.controller');
const { createCategorie, getAllCategories } = require('./controller/category.controller');
const { validInputs } = require('./middlewares/validateLoginInputs');
const validateBody = require('./middlewares/validateCreateUserBody');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateNameCategory');
const validatePostFields = require('./middlewares/validatePostFields');
const validadeCategoriesIfExist = require('./middlewares/validadeIfExistsCategories');
const { createPost, getUserPosts,
  getPostById, updatePostId, removePost, getPostByQuery } = require('./controller/post.controller');
const validateUserAuthorization = require('./middlewares/validateUserAuthorization');
const validateUpdateFields = require('./middlewares/validateUpdateInputs');
const validateIsAuthorizateUser = require('./middlewares/validateIsAuthorizateUser');
// const validateEmail = require('./middlewares/validadeEmail');

// ...

const app = express();

app.use(express.json());

app.get('/post/search', validateToken, getPostByQuery);

app.get('/user/:id', validateToken, getUserById);

app.get('/post/:id', validateToken, getPostById);

app.put('/post/:id', validateToken, validateUserAuthorization, validateUpdateFields, updatePostId);

app.get('/user', validateToken, getUsers);

app.get('/categories', validateToken, getAllCategories);

app.get('/post', validateToken, getUserPosts);

app.post('/login', validInputs, loginUser);

app.post('/user', validateBody, createUser);

app.post('/categories', validateToken, validateName, createCategorie);

app.post('/post', validateToken, validatePostFields, validadeCategoriesIfExist, createPost);

app.delete('/post/:id', validateToken, validateIsAuthorizateUser, removePost);

app.delete('/user/me', validateToken, removeUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
