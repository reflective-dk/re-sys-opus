define([
  'webix', 'common/promise', 'common/request', 'common/utils', 'common/lodash', 'common/ctrl-helper',
  'views/ro/ro-entity-admin', 'views/opus/opus-org-unit'
], function(webix, promise, request, utils, _, ch) {
  function Ctrl() {
  }
  Ctrl.tweakBundle = function(bundle, extension, operations, context) {
    var validOn = _.get(context, 'validOn') || (new Date()).toISOString();
    let treeRoots = bundle.unitHierarchy.roots || [];
    bundle.hierarchy = treeRoots.map(utils.webixifyTreeStrongFilter(function(element) {
      return utils.isActive(element.snapshot || {}, validOn);
    }, true));
    if (bundle.hierarchy && bundle.hierarchy[0]) {
      bundle.hierarchy[0].open = true;
    } else {
      bundle.hierarchy = [{
        id: webix.uid().toString(),
        object: {
          snapshot: {
            class: {id: "4b4dc8bd-a3d7-4f29-9437-16c96f1bd52e", name: "Message"},
            name: "Intet hierarki"
          }
        }
      }];
    }
  };
  return Ctrl;
});
