require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine= require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const session= require('express-session');
const mongoose= require('mongoose');
const methodOverride= require('method-override');
//const seedPosts= require('./seeds');
//seedPosts();

//require routes
const index = require('./routes/index');
const posts = require('./routes/posts');
const reviews= require('./routes/reviews');

const app = express();

//connect to database
mongoose.connect('mongodb://localhost:27017/surf-shop',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.set('useCreateIndex', true);
const db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
  console.log('we\'re connected!');
});

//use ejs locals for all ejs templates
app.engine('ejs', engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//add moment to every view
app.locals.moment= require('moment');

//Configure Passport and Sessions
app.use(session({
  secret: 'hang ten dude!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set local variables middleware
app.use(function(req, res, next) {
  //req.user= {
  //  '_id': '5f5731d2e077c3d35f6e98be',
    //'_id': '5f5731d2e077c3d35f6e98be',
    //'_id': '5f570636648a32aef541a93a',
  //  'username': 'rav3' };
  res.locals.currentUser = req.user;
  //set default page title
  res.locals.title= 'MarketPlace';
  //set success flash message
  res.locals.success= req.session.success || '';
  delete req.session.success;
  //set error flash message
  res.locals.error= req.session.error || '';
  delete req.session.error;
  next();
})

//Mount Routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  console.log(err);
  req.session.error= err.message;
  res.redirect('back');
});



module.exports = app;
