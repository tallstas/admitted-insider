var Card = require('../models/Card');

module.exports.getCardOfType = function (type){
  var card = new Card();
  card.type = type;
  switch (type){
    case 'toefl': 
      card.fields.push({content: {'type': 'input', 'text': 'University code', 'input': '92122'}});
      // card.fields.push({type: 'checked', text: 'I sent', checked: false});
      // card.fields.push({type: 'checked', text: 'University received', checked: false});
      // card.fields.push({type: 'date', text: 'Sent on', date: ''});
      break;
    default:
      cards.fields.push('nothing')
  }
  return card;
}