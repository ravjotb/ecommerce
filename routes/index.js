const express = require('express');
const router = express.Router();
const multer= require('multer');
const {cloudinary, storage}= require('../cloudinary');
const upload= multer({ storage: storage });
const stripe = require("stripe")("sk_test_51Hi5ySAXpsTNzGqXp9cILRiPkLcoDn8e8gOohxili1eZorXaIrMfCF1RcrjWONa3wKhwhXuvEt5SPGzVWJLaqq4m00JQi11Ba7");
const YOUR_DOMAIN = 'http://localhost:3000';
const { landingPage, getRegister, postRegister,
        getLogin, postLogin, getLogout,
        getProfile, updateProfile, getForgotPassword,
        putForgotPassword, getReset, putReset, createSession} = require('../controllers');
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


router.post('/create-session',   async (req, res)=>{
      console.log(req.body);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: req.body.postName,
                images: [req.body.postImage],
              },
              unit_amount: req.body.postPrice,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });
      res.json({ id: session.id });
});

module.exports = router;
