// Generated by CoffeeScript 1.6.3
(function() {
  var _;

  _ = require('lodash');

  module.exports.app = function(appExports, model) {
    var user;
    user = model.at('_user');
    appExports.toggleFilterByTag = function(e, el) {
      var path, tagId;
      tagId = $(el).attr('data-tag-id');
      path = 'filters.' + tagId;
      return user.set(path, !(user.get(path)));
    };
    appExports.filtersNewTag = function() {
      user.setNull('tags', []);
      user.push('tags', {
        id: model.id(),
        name: model.get("_newTag")
      });
      return model.set('_newTag', '');
    };
    appExports.toggleEditingTags = function() {
      return model.set('_editingTags', !model.get('_editingTags'));
    };
    appExports.clearFilters = function() {
      return user.set('filters', {});
    };
    return appExports.filtersDeleteTag = function(e, el) {
      var tag, tagId, tags;
      tags = user.get('tags');
      tag = e.at("_user.tags." + $(el).attr('data-index'));
      tagId = tag.get('id');
      if (!tagId) {
        user.set('tags', _.filter(tags, (function(t) {
          return t != null ? t.id : void 0;
        })));
        user.set('filters', {});
        return;
      }
      model.del("_user.filters." + tagId);
      tag.remove();
      return _.each(user.get("tasks"), function(task) {
        user.del("tasks." + task.id + ".tags." + tagId);
        return true;
      });
    };
  };

}).call(this);

/*
//@ sourceMappingURL=filters.map
*/
