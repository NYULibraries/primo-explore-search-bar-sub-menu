import searchBarSubMenuTemplate from '../html/searchBarSubMenu.html';

angular
  .module('searchBarSubMenu', [])
  .controller('searchBarSubMenuController', ['searchBarSubMenuItems', '$scope', '$filter', function(items, $scope, $filter) {
    this.$onInit = () => {
      $scope.items = items;
    };
    $scope.translate = (original) => {
      return original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));
    };
    $scope.goToUrl = (url) => {
      window.open(url, '_blank');
    };
  }])
  .component('searchBarSubMenu', {
    controller: 'searchBarSubMenuController',
    template: searchBarSubMenuTemplate
  });
