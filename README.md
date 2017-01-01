# passport-monzo

[Passport](http://passportjs.org) strategy for authenticating with
[Monzo](https://monzo.com) using the OAuth 2.0 API.

This module lets you authenticate using Monzo in your Node.js applications. By
plugging into Passport, Monzo authentication can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect)-style middleware, including
[Express](http://expressjs.com).

## Install

Using `npm`:

```bash
$ npm install passport-monzo
```

Or `yarn`:

```bash
$ yarn install passport-monzo
```

## Usage

#### Create an Application

Before using `passport-monzo`, you must register an application with Monzo. If
you have not already done so, a new application can be created at the [Monzo
Developer Console](https://developers.monzo.com/). Your application will be
issued a client ID and client secret, which need to be provided to the strategy.

#### Configure Strategy

The Monzo authentication strategy authenticates users using a Monzo account and
OAuth 2.0 tokens. The client ID and secret obtained when creating an application
are supplied as options when creating the strategy. The strategy also requires a
`verify` callback, which receives the access token and optional refresh token,
as well as `profile` which contains the authenticated user's Monzo profile. The
`verify` callback must call `cb` providing a user to complete authentication.

```js
var MonzoStrategy = require('passport-monzo').Strategy;

passport.use(new MonzoStrategy({
    clientID: MONDO_CLIENT_ID,
    clientSecret: MONDO_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/monzo/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ monzoId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'monzo'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com)
application:

```js
app.get('/auth/monzo', passport.authenticate('monzo'));

app.get('/auth/monzo/callback', 
  passport.authenticate('monzo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```
