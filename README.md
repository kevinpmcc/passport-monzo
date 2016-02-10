# passport-mondo

[Passport](http://passportjs.org/) strategy for authenticating with
[Mondo](https://getmondo.co.uk/) using the OAuth 2.0 API.

This module lets you authenticate using Mondo in your Node.js applications. By
plugging into Passport, Mondo authentication can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install passport-mondo
```

## Usage

#### Create an Application

Before using `passport-mondo`, you must register an application with Mondo. If
you have not already done so, a new application can be created at the [Mondo
Developer Console](https://developers.getmondo.co.uk/). Your application will be
issued a client ID and client secret, which need to be provided to the strategy.

#### Configure Strategy

The Mondo authentication strategy authenticates users using a Mondo account and
OAuth 2.0 tokens. The client ID and secret obtained when creating an application
are supplied as options when creating the strategy. The strategy also requires a
`verify` callback, which receives the access token and optional refresh token,
as well as `profile` which contains the authenticated user's Mondo profile. The
`verify` callback must call `cb` providing a user to complete authentication.

```js
var MondoStrategy = require('passport-mondo').Strategy;

passport.use(new MondoStrategy({
    clientID: MONDO_CLIENT_ID,
    clientSecret: MONDO_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/mondo/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ mondoId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'mondo'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/mondo', passport.authenticate('mondo'));

app.get('/auth/mondo/callback', 
  passport.authenticate('mondo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```
