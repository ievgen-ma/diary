(function() {
  'use strict';

  angular
    .module('diary')
    .controller('MainController', ['itemService', MainController]);

  function MainController(itemService) {
    var vm = this;
    vm.tab = 0;
    vm.showTab = showTab;
    vm.setTab = setTab;
    vm.addItem = addItem;
    vm.removeItem = removeItem;
    vm.addComment = addComment;

    listItems();

    function listItems(){
      vm.items = itemService.listItems();
    }

    function clear(){
      vm.name = null;
      vm.comment = null;
    }

    function addItem(name) {
      itemService.addItem(name);
      clear();
    }

    function removeItem(name) {
      itemService.removeItem(name);
    }

    function addComment(name, comment) {
      itemService.addComment(name, comment);
      clear();
    }

    function showTab(tab) {
      return vm.tab === tab;
    }

    function setTab(tab) {
      vm.tab = tab;
    }

  }
})();