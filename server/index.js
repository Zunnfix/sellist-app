const path = require('path');
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const { getAllProducts } = require('./controllers/landerController')
const { register, login, logout } = require('./controllers/authController')
const { postProduct, setFavorite, editProduct, deleteProduct, getProduct, getCategory } = require('./controllers/productController')

const app = express();
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 20 // * 24
  }
}))

app.use( express.static( `${__dirname}/../build` ));

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database Connected');
})

// Endpoints
app.get('/api/get-category/:id', getCategory)
app.get('/api/product/:id', getProduct)
app.put('/api/edit-product/:id', editProduct)
app.delete('/api/delete-product/:id', deleteProduct)
app.post('/api/set-favorite', setFavorite)
app.post('/api/post-product', postProduct)
app.get('/api/all-products', getAllProducts)
app.post('/auth/register', register)
app.post('/auth/login', login)
app.get('/auth/logout', logout)

app.get('/api/user', function(req, res) {
  if(req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(404).json({
      error: "USER_NOT_FOUND"
    })
  }
})

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));