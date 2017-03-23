var express = require('express');
var builder = require('botbuilder');
var request = require('request');
var Path = require('path');

var nlpUrl = "https://www.botinno.tech/nlp/parse";

//USer Service
var userInfosServices = require('./back/services/userInfos');
var jokeServices = require('./back/services/jokeServices');
var MapCard = require('botbuilder-location/lib/map-card');

//=========================================================
// Bot Setup
//=========================================================

// Setup Express Server
var server = express();

server.listen( 3000, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({});

server.use('/images',  express.static(__dirname + '/users_images'));

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var handleUserRequest = function(serviceToCall, values, session) {
  var defaultAnswer = "Je crains de ne pas avoir compris... :'(";
  var searchTerms = values.map(function(value) {
    return value.content;
  });
  switch(serviceToCall) {
    case "where_works" : {
      var result = userInfosServices.findUsers("joana");
      var userCards = [];
      if(result && result.length > 0) {
        result.map(function(user) {
          var imageUrl = ngrockFackeUrl+"images/" + userInfosServices.getUserImage(user);
          userCards.push(new builder.HeroCard(session)
                       .title(user.name)
                       .text(user.jobTitle +  ", " +  user.department +  ",  " + user.city)
                       .images([
                           builder.CardImage.create(session, imageUrl)
                               .tap(builder.CardAction.showImage(session, imageUrl)),
                       ]));
        });
        var msg = new builder.Message(session)
             .textFormat(builder.TextFormat.xml)
             .attachmentLayout(builder.AttachmentLayout.carousel)
             .attachments(userCards);
        return msg;
      }
      return defaultAnswer;
    }
	  case "joke": {
      var joke = jokeServices.getJoke();
      return joke.question + "\n\n...\n\n...\n\n...\n\n" + joke.answer;
	  }
    case "hello": {
    	return "Salut !!";
    }
	  case "how_are_you": {
	     return "ça va, merci!";
	  }
	  case "who_are_you": {
	    return "Je suis JD, le bot VSC qui te simplifie la vie!";
	  }
	  case "not_good": {
	    return "Désolé, je fais de mon mieux... :(";
	  }
	  case "good": {
	    return ":)";
	  }
    default: return "Je crains de ne pas avoir compris... :'(";
  }
}

bot.dialog('/', function (session) {
  var searchTerm;;
  if(session.message) {
    searchTerm = session.message.text;
  }
  //TODO Use nlp

  session.send(handleUserRequest(body.intent, values, session));
});
