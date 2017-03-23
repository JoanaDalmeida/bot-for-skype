var fs = require('fs');
var Path = require('path');
var _ = require('lodash');

var jokesFilePath = Path.resolve(".", "jokes.json");


var jokes = require(jokesFilePath).jokes;

module.exports = {
    getJoke: getJoke
};

function getJoke() {
  var i = Math.floor(Math.random() * jokes.length)
  return jokes[i];
}
