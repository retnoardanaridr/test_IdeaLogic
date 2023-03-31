const express = require('express');
const router = express.Router();
const { register, login, checkAuth } = require('../controllers/auth');
const { addCategory, getCategories, getCategory } = require('../controllers/category');
const { getProducts, getProduct, addProducts } = require('../controllers/product');
const { addUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const { getPrice } = require('../controllers/varPrice');


//route auth
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

//router users Query
router.post('/user', addUser);
router.get('/users', auth, getUsers)
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/catergory', addCategory);
router.get('/categories', getCategories);
router.get('/category/:id', getCategory);

router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', auth, addProducts);

router.get('/varprices', getPrice);


module.exports = router;