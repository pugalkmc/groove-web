const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')
const morgan = require("morgan")
const TelegramStrategy = require('passport-telegram').Strategy;

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(cors({
  origin:"https://groove-client-pugalkmc.vercel.app"
}))
app.use(session({ secret: 'groove', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new TelegramStrategy(
    {
      clientID: '12882680',
      clientSecret: '2efd8d392144342f197027b79bf8752a',
      // Optional: Customize the callback URL and pass additional options if needed
    },
    (profile, done) => {
      return done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  // Serialize user data to store in the session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user data from the session
  done(null, user);
});  


// Authentication route
app.get('/auth/telegram', passport.authenticate('telegram'));

// Callback route after successful authentication
app.get(
  '/auth/telegram/callback',
  passport.authenticate('telegram', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated
}

// Example: Protect a dashboard route
app.get('/dashboard', isAuthenticated, (req, res) => {
  // Render the dashboard for authenticated users
});


// Route to check if the user is authenticated
app.get('/check-auth', (req, res) => {
  console.log(req.params)
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
