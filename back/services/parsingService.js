var _ = require('lodash');

module.exports = {
    parseQuery: parseQuery
};

function parseQuery(query) {
  query = query.toLowerCase();
  if(query) {
    if(query.indexOf("hello") == 0 || query.indexOf("salut") == 0
      || query.indexOf("coucou") == 0) {
        return "hello";
    }
    if(query.indexOf("rire") >= 0 || query.indexOf("coucou") == 0) {
        return "joke";
    }
    if(query.indexOf("qui es tu") == 0) {
        return "who_are_you";
    }
    if(query.indexOf("comment") >= 0 && query.indexOf("va") >= 0) {
        return "how_are_you";
    }
    if(query.indexOf("connard") >= 0 || query.indexOf("salaud") >= 0) {
        return "not_good";
    }
    if(query.indexOf("merci") >= 0 || query.indexOf("gentil") >= 0) {
        return "good";
    }
    if(query.indexOf("qui est") >= 0 || query.indexOf("ou travaille") >= 0) {
        return "where_works";
    }
  }
  return "unknown";
}
