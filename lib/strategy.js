"use strict";

const util = require("util");

const OAuth2Strategy = require("passport-oauth2");
const InternalOAuthError = require("passport-oauth2").InternalOAuthError;

const profile = require("./profile");

function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || "https://auth.monzo.com/";
  options.tokenURL = options.tokenURL || "https://api.monzo.com/oauth2/token";
  options.customHeaders = options.customHeaders || {};

  if (!options.customHeaders["User-Agent"]) {
    options.customHeaders["User-Agent"] = options.userAgent || "passport-monzo";
  }

  OAuth2Strategy.call(this, options, verify);
  this.name = "monzo";
  this._userProfileURL = options.userProfileURL || "https://api.monzo.com/accounts";
  this._oauth2.useAuthorizationHeaderforGET(true);
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(token, done) {
  this._oauth2.get(this._userProfileURL, token, (err, body, res) => {
    if (err) {
      return done(new InternalOAuthError("Failed to fetch account profile", err));
    }

    let json;

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error("Failed to parse account profile"));
    }

    let account = profile.parse(json);
    account.provider  = "monzo";
    account._raw = body;
    account._json = json;

    done(null, account);
  });
};

module.exports = Strategy;
