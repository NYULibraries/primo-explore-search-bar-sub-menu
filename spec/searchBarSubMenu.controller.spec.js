let viewName = "TEST";
let searchBarSubMenuItems = [
  {
    name: "Back to Primo Classic",
    description: "Back to Primo Classic",
    action: "http://primo.school.edu/primo_library/libweb/action/search.do?vid=" + viewName,
    icon: {
      set: 'navigation',
      icon: 'ic_arrow_back_24px'
    },
    show_xs: true,
    cssClasses: 'button-over-dark'
  },
  {
    name: "Library Hours",
    description: "Library Hours",
    action: "https://school.edu/library-hours",
    icon: {
      set: 'av',
      icon: 'ic_av_timer_24px'
    },
    cssClasses: 'button-over-dark'
  }
];

describe('searchBarSubMenuController', () => {

  let $controller, $scope, $filter;
  let controller;

  beforeEach(module('searchBarSubMenu', ($provide) => {
    $provide.constant("searchBarSubMenuItems", searchBarSubMenuItems);
    $provide.value("translateFilter", (original) => original + "!");
  }));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$filter_) {
    $controller = _$controller_;
    $scope = _$rootScope_;
    $filter = _$filter_;

    controller = $controller('searchBarSubMenuController', { $scope: $scope });
  }));

  beforeEach(() => {
    spyOn(window, 'open').and.stub();
  });

  describe('$onInit', () => {
    it('should set items array in scope', () => {
      controller.$onInit();
      expect($scope.items).toEqual(searchBarSubMenuItems);
    });
  });

  describe('translate', () => {
    it('should pass through text not in curly braces', () => {
      inject(function($filter) {
        expect($scope.translate('My Value')).toEqual("My Value");
      });
    });
    it('should translate text within curly braces', () => {
      inject(function($filter) {
        expect($scope.translate('My {CONFIG_VALUE} value')).toEqual("My CONFIG_VALUE! value");
      });
    });
  });


  describe('goToUrl', () => {
    it('should open the given url in a new window', () => {
      const url = 'http://example.com';
      $scope.goToUrl(url);
      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });
  });

});
