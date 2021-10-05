define([
    'webix', 'common/$$', 'common/lodash', 'common/webix-component-helper', './snippets/entity'
], function(webix, $$, _, wch, entity) {
  webix.protoUI({
    name: "ro-unit",
    $init: function(config) {
      this.$view.className += " ro-unit";
      config = wch.$init.apply(this, [config, {id: "40864bd7-2ac2-468d-80a5-68aefa018524", name: "opus-org-unit"}]);
      config.mandatory = {name: true};
      config.elements = [{
        view:"fieldset",
        label:"OPUS Enhed",
        body: {
          rows: [
          entity(config),
          {
            view: "checkbox",
            name: "intraNote",
            labelWidt: 0,
            labelRight: "IntraNote bund",
            tooltip: "Nedereste enhed vist i IntraNote. Medarbejdere under flyttes op til denne enhed"
          },{
            view: "checkbox",
            name: "stsOrg",
            labelWidt: 0,
            labelRight: "Undtaget fra STS Organisation",
            tooltip: "Undtag enhed fra opbygning af STS Organisation"
          }]
        }
      }];
    },
    defaults: {
      rows: [] //NOTE: keep or webix throws error
    },
    getValue: function() {
      let object = _.get(this, "config.object", {snapshot: {}});
      let value = {};
      if (object.id) value.id = object.id;
      value.snapshot = Object.assign({}, object.snapshot, this.getValues());
      if (value.snapshot.intraNote) {
        _.set(value, "snapshot.aggregateSubTree.intraNote", value.snapshot.intraNote);
        delete value.snapshot.intraNote;
      }
      if (value.snapshot.stsOrg) {
        _.set(value, "snapshot.aggregateSubTree.stsOrg", value.snapshot.stsOrg);
        delete value.snapshot.stsOrg;
      }
      if (value.snapshot.institutetsNummer) {
        _.set(value, "snapshot.foreignIds[institutetsNummer]", value.snapshot.institutetsNummer);
        delete value.snapshot.institutetsNummer;
      }
      return value;
    },
    setValue: function(object) {
      if (object) {
        this.config.object = object;
        wch.simpleSetValue.apply(this,[object]);
        this.setValues({
          intraNote: _.get(object, "snapshot.aggregateSubTree.intraNote"),
          stsOrg: _.get(object, "snapshot.aggregateSubTree.stsOrg"),
          institutetsNummer: _.get(object, "snapshot.foreignIds[institutetsNummer]")
        }, true);
      }
    }
  }, webix.ui.form);
})