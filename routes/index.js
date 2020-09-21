const express = require('express');
const router = express.Router();
const multer= require('multer');
const {cloudinary, storage}= require('../cloudinary');
const upload= multer({ storage: storage });
const { landingPage, getRegister, postRegister,
        getLogin, postLogin, getLogout,
        getProfile, updateProfile, getForgotPassword,
        putForgotPassword, getReset, putReset} = require('../controllers');
const { asyncErrorHandler, isLoggedIn, isValidPassword, changePassword } = require('../middleware/index');

/* GET home/landing page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register  */
router.get('/register', getRegister);


/* POST /register */
router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));

/* PUT /profile */
router.put('/profile', isLoggedIn,
  upload.single('image'),
  asyncErrorHandler(isValidPassword),
  asyncErrorHandler(changePassword),
  asyncErrorHandler(updateProfile)
);

/* GET /forgot */
router.get('/forgot-password', getForgotPassword);

/* PUT /forgot */
router.put('/forgot-password', asyncErrorHandler(putForgotPassword));

/* GET /reset/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset/:token */
router.put('/reset/:token', asyncErrorHandler(putReset));
module.exports = router;
