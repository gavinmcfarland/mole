"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = groupBy;

function groupBy(list, keyGetter) {
  var map = new Map();
  list.forEach(function (item) {
    var key = keyGetter(item);
    var collection = map.get(key);
    var newItem = {
      template: item.template,
      data: item.data
    };

    if (!collection) {
      map.set(key, [newItem]);
    } else {
      collection.push(newItem);
    }
  });
  return map;
}