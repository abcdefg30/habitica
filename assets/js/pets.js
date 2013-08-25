// Generated by CoffeeScript 1.6.3
(function() {
  var hatchingPotions, pets, randomVal, _, _ref;

  _ = require('lodash');

  randomVal = require('habitrpg-shared/script/helpers').randomVal;

  _ref = require('habitrpg-shared/script/items').items, pets = _ref.pets, hatchingPotions = _ref.hatchingPotions;

  /*
    app exports
  */


  module.exports.app = function(appExports, model) {
    var user;
    user = model.at('_user');
    appExports.chooseEgg = function(e, el) {
      return model.ref('_hatchEgg', e.at());
    };
    appExports.hatchEgg = function(e, el) {
      var egg, eggIdx, eggs, hatchingPotionIdx, hatchingPotionName, myHatchingPotion, myPets;
      hatchingPotionName = $(el).children('select').val();
      myHatchingPotion = user.get('items.hatchingPotions');
      egg = model.get('_hatchEgg');
      eggs = user.get('items.eggs');
      myPets = user.get('items.pets');
      hatchingPotionIdx = myHatchingPotion.indexOf(hatchingPotionName);
      eggIdx = eggs.indexOf(egg);
      if (hatchingPotionIdx === -1) {
        return alert("You don't own that hatching potion yet, complete more tasks!");
      }
      if (eggIdx === -1) {
        return alert("You don't own that egg yet, complete more tasks!");
      }
      if (myPets && myPets.indexOf("" + egg.name + "-" + hatchingPotionName) !== -1) {
        return alert("You already have that pet, hatch a different combo.");
      }
      user.push('items.pets', egg.name + '-' + hatchingPotionName, function() {
        eggs.splice(eggIdx, 1);
        myHatchingPotion.splice(hatchingPotionIdx, 1);
        user.set('items.eggs', eggs);
        return user.set('items.hatchingPotions', myHatchingPotion);
      });
      return alert('Your egg hatched! Visit your stable to equip your pet.');
    };
    appExports.choosePet = function(e, el, next) {
      var modifier, name, pet, petStr, _ref1;
      petStr = $(el).attr('data-pet');
      if (user.get('items.pets').indexOf(petStr) === -1) {
        return next();
      }
      if (user.get('items.currentPet.str') === petStr) {
        return user.set('items.currentPet', {});
      }
      _ref1 = petStr.split('-'), name = _ref1[0], modifier = _ref1[1];
      pet = _.find(pets, {
        name: name
      });
      pet.modifier = modifier;
      pet.str = petStr;
      return user.set('items.currentPet', pet);
    };
    appExports.buyHatchingPotion = function(e, el) {
      var gems, name, newHatchingPotion;
      name = $(el).attr('data-hatchingPotion');
      newHatchingPotion = _.find(hatchingPotions, {
        name: name
      });
      gems = user.get('balance') * 4;
      if (gems >= newHatchingPotion.value) {
        if (confirm("Buy this hatching potion with " + newHatchingPotion.value + " of your " + gems + " Gems?")) {
          user.push('items.hatchingPotions', newHatchingPotion.name);
          return user.set('balance', (gems - newHatchingPotion.value) / 4);
        }
      } else {
        return $('#more-gems-modal').modal('show');
      }
    };
    return appExports.buyEgg = function(e, el) {
      var gems, name, newEgg;
      name = $(el).attr('data-egg');
      newEgg = _.find(pets, {
        name: name
      });
      gems = user.get('balance') * 4;
      if (gems >= newEgg.value) {
        if (confirm("Buy this egg with " + newEgg.value + " of your " + gems + " Gems?")) {
          user.push('items.eggs', newEgg);
          return user.set('balance', (gems - newEgg.value) / 4);
        }
      } else {
        return $('#more-gems-modal').modal('show');
      }
    };
  };

}).call(this);

/*
//@ sourceMappingURL=pets.map
*/
