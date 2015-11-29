var User = require('../models/User');
var Application = require('../models/Application');
var Factory = require('../models/Factory');

/**
 * GET /contact
 * Contact form page.
 */

updateUniversity = function(req, res) {
  var name = req.body.universityName;
  var description = req.body.universityDescription;
  
  // Check for this element in the applications array and make the changes
  User.findById(req.user.id, function(err, user) {
    for(var i=0; i<user.applications.length; ++i){
      if(user.applications[i].university.name == name){
        user.applications[i].university.description = description;
        break;
      }
    }
    user.save(function(err) {
      req.flash('success', { msg: 'University details updated.' });
      res.redirect('/overview');
    });
  });
};

deleteUniversity = function(req, res){
  var university_name = req.universityName;
  User.findById(req.user.id, function(err, user) {
    // This doesn't seem to work
    Application.remove({"applications" : {"university" : {"name" : university_name}}});
    req.flash('success', { msg: 'University successfully deleted.' });
    res.redirect('/overview');
  });
};

postUniversity = function(req, res) {
  console.log('Hi from postUniversity')
  req.assert('universityName', "University name can't be empty").len(1);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/overview');
  }

  var application = new Application();
  application.university.name = req.body.universityName,
  application.university.description = req.body.universityDescription,
  application.program.name = req.body.programName,
  application.program.description = req.body.programDescription

  User.findById(req.user.id, function(err, user) {
    console.log('Hi from findById')
    user.applications.push(application)
    user.save(function(err) {
      console.log('Hi from user.save')
      req.flash('success', { msg: 'University added.' });
      //res.end()
      //res.redirect('/contact');
      res.redirect('/overview');
    });
  });
};

exports.handleButton = function(req, res){
  if('Update' in req.body){
    updateUniversity(req, res);
  }
  else if('Delete' in req.body){
    deleteUniversity(req, res);
  }
  else if('Add' in req.body){
    postUniversity(req, res);
  }
  else{
    res.render('uniapp/overview', {
      title: 'Overview'
    });
  }
};

exports.getOverview = function(req, res) {
  res.render('uniapp/overview', {
    title: 'Overview'
  });
};

exports.getUniversity = function(req, res, next) {
  res.render('uniapp/university', {
    title: 'University'
  });
};

exports.postCard = function(req, res, next) {

  var card = Factory.getCardOfType(req.body.newCardType)

  Application.findById(req.application.id, function(err, application) {
    if (err) return next(err);

    application.cards.push(card);

    application.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Card added.' });
    });
  });
}