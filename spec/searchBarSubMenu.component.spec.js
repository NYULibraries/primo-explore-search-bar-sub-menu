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

describe('template', () => {
  beforeEach(module('searchBarSubMenu', ($provide) => {
    $provide.constant("searchBarSubMenuItems", searchBarSubMenuItems);
    $provide.value("translateFilter", (original) => original + "!");
  }));

  let $compile, $rootScope, element;
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    element = $compile("<search-bar-sub-menu></search-bar-sub-menu>")($rootScope);
    $rootScope.$digest();
  }));

  describe('general template properties', () => {

    it('should contain a single div element at the top-level', () => {
      const children = element.children();
      expect(children[0].tagName).toEqual("DIV");
      expect(children.length).toEqual(1);

    });

    it('should contain a single unordered list', () => {
      const uls = element.find('ul');
      expect(uls.length).toEqual(1);
    });
  });

  describe('submenu list', () => {
    let ul;
    beforeEach(() => {
      ul = element.find('ul')[0];
    });

    it ('should have proper number of list items', () => {
      expect(ul.childElementCount).toEqual(searchBarSubMenuItems.length);
    });

    it('should have button with link to action property', () => {
      const lis = ul.children;
      for(let i = 0; i < lis.length; i++) {
        const li = lis[i];
        const href = li.querySelector('button').getAttribute('data-href');
        expect(href).toEqual(searchBarSubMenuItems[i].action);
      }

      // Babel polyfill Array.from in ES2015?
      // Array.from(ul.children).forEach((li, idx) => {
      //   const href = li.querySelector('button').getAttribute('data-href');
      //   expect(href).toEqual(searchBarSubMenuItems[idx].action);
      // });
    });

  });

});
