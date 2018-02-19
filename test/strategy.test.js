"use strict";

const MonzoStrategy = require("../lib/strategy");

describe("Strategy", () => {
  let strategy = new MonzoStrategy({
    clientID: "ABC123",
    clientSecret: "secret",
  }, () => {});

  it("is named monzo", () => {
    expect(strategy.name).to.equal("monzo");
  });

  it("has default user agent", () => {
    expect(strategy._oauth2._customHeaders["User-Agent"]).to.equal("passport-monzo");
  });

  describe("constructed with user agent option", () => {
    let strategy = new MonzoStrategy({
      clientID: "ABC123",
      clientSecret: "secret",
      userAgent: "example.com"
    }, () => {});

    it("has custom user agent", () => {
      expect(strategy._oauth2._customHeaders["User-Agent"]).to.equal("example.com");
    });
  });

  describe("constructed with custom headers including user agent", () => {
    let strategy = new MonzoStrategy({
      clientID: "ABC123",
      clientSecret: "secret",
      customHeaders: { "User-Agent": "example.org" }
    }, () => {});

    it("has custom user agent", () => {
      expect(strategy._oauth2._customHeaders["User-Agent"]).to.equal("example.org");
    });
  });

  describe("constructed with both custom headers including user agent and user agent option", () => {
    let strategy = new MonzoStrategy({
      clientID: "ABC123",
      clientSecret: "secret",
      customHeaders: { "User-Agent": "example.org" },
      userAgent: "example.net"
    }, () => {});

    it("has custom user agent", () => {
      expect(strategy._oauth2._customHeaders["User-Agent"]).to.equal("example.org");
    });
  });
});
