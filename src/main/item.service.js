(function() {
  'use strict';

  angular
    .module('diary')
    .service('itemService', ['$localStorage', itemService]);

  function itemService($localStorage) {
    return {
      addItem: addItem,
      removeItem: removeItem,
      listItems: listItems,
      addComment: addComment,
    };

    function addComment(name, comment) {
      for (var i = 0; i < listItems().length; i++) {
        if (listItems()[i].name == name) {
          listItems()[i].comments.push(comment);
        }
      }
    }

    function listItems() {
      if ($localStorage.items === undefined) {
        $localStorage.items = [];
      }
      return $localStorage.items;
    }

    function addItem(name) {
      if ($localStorage.items === undefined) {
        $localStorage.items = [];
      }
      $localStorage.items.push({
        name: name,
        comments: []
      });
    }

    function removeItem(name) {
      for (var i = 0; i < listItems().length; i++) {
        if (listItems()[i].name == name) {
          listItems().splice(i, 1);
        }
      }
    }
  }
})();