var fs = require('fs');
var Path = require('path');
var _ = require('lodash');

var usersFilePath = Path.resolve(".", "users.json");


var users = require(usersFilePath).users;

module.exports = {
    findUser: findUser,
    findUsers: findUsers,
    getUserImage: getUserImage
};

function findUsers(values) {
  var result = [];
  _.map(values, function(value){
    var temp = findUser(value);
    if(temp) {
      result = _.concat(result, temp);
    }
  });
  return result;
}

function findUser(searchTerm) {
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      return _.filter(users, function(user) {
        return user.firstName.toLowerCase().indexOf(searchTerm) == 0 ||
              user.lastName.toLowerCase().indexOf(searchTerm) == 0 ||
              (user.lastName.toLowerCase() + ' ' + user.firstName.toLowerCase()).indexOf(searchTerm) == 0||
              (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).indexOf(searchTerm) == 0;
      });
    }
}

function getUserImage(user) {

var usersImageFilePath = Path.resolve("./users_images", user.firstName+'_'+user.lastName.toUpperCase()+'.jpg');

    if (user) {
        if (fs.existsSync(usersImageFilePath)) {
           return user.firstName+'_'+user.lastName.toUpperCase()+'.jpg' ;
        }
    }
    return "default_user.png"
}
