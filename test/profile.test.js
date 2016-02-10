"use strict";

const fs = require("fs");

const profile = require("../lib/profile");

describe("profile.parse", () => {
  describe("example profile", () => {
    let account;

    before(done => {
      fs.readFile("test/data/example.json", "utf8", (err, data) => {
        if (err) { return done(err); }
        account = profile.parse(data);
        done();
      });
    });

    it("parses profile", () => {
      expect(account.id).to.equal("acc_000084l1RzaSFJv2KOnNsZ");
      expect(account.displayName).to.equal("Tom Bell");
    });
  });
});
