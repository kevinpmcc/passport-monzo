"use strict";

const parse = json => {
  if (typeof json === "string") {
    json = JSON.parse(json);
  }

  // get the first account from the list.
  json = json["accounts"][0];

  let profile = {};
  profile.id = String(json.id);
  profile.displayName = json.description;

  return profile;
}

exports.parse = parse;
