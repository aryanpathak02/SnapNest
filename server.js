require('dotenv').config();
const express = require('express');
const app = express();
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.model.js');
const postRoute = require('./routes/post.route.js');
const commentRoute = require('./routes/comment.route.js');
const userRoute = require('./routes/user.router.js');
const likeRoutes = require('./routes/like.router.js');
const followRoutes = require('./routes/follow.router.js');
const notificationRoute = require('./routes/notification.route.js');
const StatusRoute = require('./routes/status.route.js');
const savedPostRoute = require('./routes/savedPosts.route.js');
const connectDb = require('./database/db.js');
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const connectMongo = require('connect-mongo');
const port = process.env.PORT || 8080;

connectDb();

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({
        mongoUrl: process.env.dbURL,
        collectionName: 'sessions',  
        ttl: 14 * 24 * 60 * 60,  
    }),
    cookie: { secure: false }  // Make sure you change this to `true` in production when using HTTPS
}));

app.use(flash());
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.set('views', './views');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || null; 
    next();
});

app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);
app.use('/savedPost', savedPostRoute);
app.use('/like', likeRoutes);
app.use('/follow', followRoutes);
app.use('/notification', notificationRoute);
app.use('/story', StatusRoute);

app.get('/', (req, res) => {
    res.send(`Hi, I am root`);
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

app.get('*', (req, res) => {
    res.send(`404 page not found`);
});

app.listen(port, () => {
    console.log(`The app is listing at port ${port}`);
});
