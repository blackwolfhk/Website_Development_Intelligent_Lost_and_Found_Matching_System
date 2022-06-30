import express from 'express'
import session from 'express-session'
import googleOauth20 from 'passport-google-oauth20'
import facebook from 'passport-facebook'
import passport from 'passport'

let FacebookStrategy = facebook.Strategy
let GoogleStrategy = googleOauth20.Strategy
const GOOGLE_CLIENT_ID = "544255968816-l0v84t6erfrl4p791k8m8ha4kjb3ed3q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const FACEBOOK_APP_ID = "621415945556086";
const FACEBOOK_APP_SECRET = "df3843e2ba7a75b368f6933c929af166";


export let app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done) {
    done(null, user);
});




passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log('call back profile : ', profile)
        cb(null, (profile));
    }
));
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('google login success :', req.session)
        res.redirect('http://localhost:3000/googleOK');
    });



passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log('FacebookStrategy callback :', profile)
        cb(null, profile);
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('faecebook login success :', req.session)
        res.redirect('http://localhost:3000/facebookOK');
    });

app.get("/fail", (req, res) => {
    res.send("Failed attempt");
});

app.get("/", (req, res) => {
    res.send("Success");
});
app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
})
