var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res){
  Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
    if(err){
      console.log(err);
      return res.status(400).json({error:'An error occurred'});
    }
    res.render('app', {csrfToken: req.csrfToken(), domos: docs});

  });
};

var clearAllDomos = function(req, res){
  Domo.DomoModel.remove({});
  res.json({message:"You win"});
};
var clearAllSuccess = function(req, res){
  res.render('app');
}
var makeDomo = function(req, res){
  //check to see if fields are filled
  if(!req.body.name || !req.body.age){
    return res.status(400).json({error:"RAWR! Both a name and age are required."});
  }
  //create a new Domo object
  var domoData = {
    name: req.body.name,
    age: req.body.age,
    happiness: req.body.happiness,
    owner: req.session.account._id
  };
  var newDomo = new Domo.DomoModel(domoData);

  newDomo.save(function(err){
    if(err){
      console.log(err.message);
      return res.status(400).json({error:'An error occurred'});
    }
    res.json({redirect: '/maker'});
  });

}

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.clearAll = clearAllDomos;
module.exports.clearAllSuccess = clearAllSuccess;
