const searchBarSubMenuItems = __fixtures__['searchBarSubMenuItems'];

describe('searchBarSubMenu component', () => {
  beforeEach(module('searchBarSubMenu', ($provide) => {
    $provide.constant("searchBarSubMenuItems", searchBarSubMenuItems);
    $provide.value("translateFilter", (original) => original);
  }));

  let $compile, $rootScope, element;
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    const scope = $rootScope.$new();
    element = $compile("<search-bar-sub-menu />")(scope);
    // element is a jqlite object
    scope.$digest();
  }));

  describe('template layout', () => {

    it('should have styled div element at the top-level', () => {
      const children = element.children();
      const div = children[0];

      expect(div.tagName).toEqual('DIV');
      expect(children.length).toEqual(1);
      expect(div.className).toContain('search-bar-sub-menu');
    });

    it('should contain a single unordered list', () => {
      const uls = element.find('ul');
      expect(uls.length).toEqual(1);
    });
  });

  describe('submenu buttons', () => {
    let buttons;
    beforeEach(() => {
      buttons = element.find('ul')[0].querySelectorAll('button');
    });

    it('should be appropriate amount', () => {
      expect(buttons.length).toEqual(searchBarSubMenuItems.length);
    });

    it('should include name and description', () => {
      // Add nodelist-foreach-polyfill? https://www.npmjs.com/package/nodelist-foreach-polyfill
      Array.from(buttons).forEach((button, idx) => {
        expect(button.innerText).toContain(searchBarSubMenuItems[idx].name);
        expect(button.innerText).toContain(searchBarSubMenuItems[idx].description);
      });
    });

    it('should link to action property', () => {
      Array.from(buttons).forEach((button, idx) => {
        const href = button.getAttribute('data-href');
        expect(searchBarSubMenuItems[idx].action).toContain(href);
      });
    });

    it('should map CSS classes', () => {
      Array.from(buttons).forEach((button, idx) => {
        const classes = button.className;
        expect(classes).toContain(searchBarSubMenuItems[idx].cssClasses);
      });
    });

    it('should contain primo icons with mapped attributes', () => {
      Array.from(buttons).forEach((button, idx) => {
        const iconEl = button.querySelector('prm-icon');
        const iconSet = iconEl.getAttribute('svg-icon-set');
        const iconDef = iconEl.getAttribute('icon-definition');

        expect(iconSet).toEqual(searchBarSubMenuItems[idx].icon.set);
        expect(iconDef).toEqual(searchBarSubMenuItems[idx].icon.icon);
      });
    });
  });
});
