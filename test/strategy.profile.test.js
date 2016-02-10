"use strict";

const MondoStrategy = require("../lib/strategy");

describe("Strategy#userProfile", () => {

  describe("fetched from default endpoint", () => {
    var strategy =  new MondoStrategy({
      clientID: "ABC123",
      clientSecret: "secret"
    }, () => {});

    strategy._oauth2.get = (url, accessToken, callback) => {
      if (url != "https://api.getmondo.co.uk/accounts") {
        return callback(new Error("wrong url argument"));
      }

      if (accessToken != "token") {
        return callback(new Error("wrong token argument"));
      }

      var body = '{ "accounts": [{ "id": "acc_000084l1RzaSFJv2KOnNsZ", "account_number": "19784596", "sort_code": "000001", "created": "2016-02-01T18:28:35.841Z", "description": "Tom Bell" }]}';

      callback(null, body, undefined);
    };

    var profile;

    before(done => {
      strategy.userProfile("token", (err, p) => {
        if (err) {
          return done(err);
        }

        profile = p;
        done();
      });
    });

    it("should parse profile", () => {
      expect(profile.provider).to.equal("mondo");

      expect(profile.id).to.equal("acc_000084l1RzaSFJv2KOnNsZ");
      expect(profile.displayName).to.equal("Tom Bell");
    });

    it("should set raw property", () => {
      expect(profile._raw).to.be.a("string");
    });

    it("should set json property", () => {
      expect(profile._json).to.be.an("object");
    });
  });

  describe("fetched from custom endpoint", () => {
    var strategy =  new MondoStrategy({
      clientID: "ABC123",
      clientSecret: "secret",
      userProfileURL: "https://api.getmondo.dev/accounts"
    }, () => {});

    strategy._oauth2.get = (url, accessToken, callback) => {
      if (url != "https://api.getmondo.dev/accounts") {
        return callback(new Error("wrong url argument"));
      }

      if (accessToken != "token") {
        return callback(new Error("wrong token argument"));
      }

      var body = '{ "accounts": [{ "id": "acc_000084l1RzaSFJv2KOnNsZ", "account_number": "19784596", "sort_code": "000001", "created": "2016-02-01T18:28:35.841Z", "description": "Tom Bell" }]}';

      callback(null, body, undefined);
    };

    var profile;

    before(done => {
      strategy.userProfile("token", (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it("should parse profile", () => {
      expect(profile.provider).to.equal("mondo");

      expect(profile.id).to.equal("acc_000084l1RzaSFJv2KOnNsZ");
      expect(profile.displayName).to.equal("Tom Bell");
    });

    it("should set raw property", () => {
      expect(profile._raw).to.be.a("string");
    });

    it("should set json property", () => {
      expect(profile._json).to.be.an("object");
    });
  });

  describe("error caused by malformed response", () => {
    var strategy =  new MondoStrategy({
        clientID: "ABC123",
        clientSecret: "secret"
      }, () => {});

    strategy._oauth2.get = (url, accessToken, callback) => {
      var body = "Hello, world.";
      callback(null, body, undefined);
    };

    var err, profile;
    before(done => {
      strategy.userProfile("token", (e, p) => {
        err = e;
        profile = p;
        done();
      });
    });

    it("should error", () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal("Failed to parse account profile");
    });
  });

  describe("internal error", () => {
    var strategy =  new MondoStrategy({
      clientID: "ABC123",
      clientSecret: "secret"
    }, () => {});

    strategy._oauth2.get = (url, accessToken, callback) => {
      return callback(new Error("something went wrong"));
    }

    var err, profile;

    before(done => {
      strategy.userProfile("wrong-token", (e, p) => {
        err = e;
        profile = p;
        done();
      });
    });

    it("should error", () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal("InternalOAuthError");
      expect(err.message).to.equal("Failed to fetch account profile");
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal("something went wrong");
    });

    it("should not load profile", () => {
      expect(profile).to.be.undefined;
    });
  });
});
