"use strict";

const strategy = require("..");

describe("passport-mondo", () => {
  it("exports Strategy constructor directory from package", () => {
    expect(strategy).to.be.a("function");
    expect(strategy).to.equal(strategy.Strategy);
  });

  it("exports Strategy constructor", () => {
    expect(strategy.Strategy).to.be.a("function");
  });
});
