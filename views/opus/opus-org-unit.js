define([
    'webix', 'common/$$', 'common/lodash', 'common/webix-component-helper', 'views/common/snippets/active-periode'
], function(webix, $$, _, wch, activePeriode) {
  webix.protoUI({
    name: "opus-org-unit",
    $init: function(config) {
      this.$view.className += " ro-unit";
      config = wch.$init.apply(this, [config, {id: "40864bd7-2ac2-468d-80a5-68aefa018524", name: "opus-org-unit"}]);
      config.readonly = true;
      config.elements = [{
        view:"fieldset",
        label:"OPUS Enhed",
        body: {
          rows: [{
            view: "text",
            readonly: true,
            name: "orgUnitId",
            label: "Id"
          },{
            view: "text",
            readonly: true,
            name: "longName",
            label: "Navn"
          },{
            view: "text",
            readonly: true,
            name: "shortName",
            label: "Kort navn"
          },{
            view: "text",
            readonly: true,
            name: "parentOrgUnit",
            label: "Overenhed"
          },{
            view: "text",
            readonly: true,
            name: "client",
            label: "Klient"
          },{
            view: "fieldset",
            label: "Start/Slut interval",
            hidden: config.exclude["startDate"] && config.exclude["endDate"],
            body: {
              margin: 0,
              cols: [{
                view: "reDatepicker",
                label: "Start",
                labelWidth: 80,
                readonly: true,
                name: "startDate"
              },{
                width: 10
              },{
                view: "reDatepicker",
                readonly: true,
                label: "Slut",
                labelWidth: 80,
                name: "endDate"
              }]
            }
          },
          activePeriode(config),
          {
            view: "text",
            readonly: true,
            name: "street",
            label: "Gade"
          },{
            view: "text",
            readonly: true,
            name: "zipCode",
            label: "Postnr"
          },{
            view: "text",
            readonly: true,
            name: "city",
            label: "By"
          },{
            view: "text",
            readonly: true,
            name: "phoneNumber",
            label: "Telefonnummer"
          },{
            view: "text",
            readonly: true,
            name: "eanNr",
            label: "EAN"
          },{
            view: "text",
            readonly: true,
            name: "seNr",
            label: "SE Nr"
          },{
            view: "text",
            readonly: true,
            name: "pNr",
            label: "P Nr"
          },{
            view: "text",
            readonly: true,
            name: "costCenter",
            label: "Omkostningssted"
          },{
            view: "text",
            readonly: true,
            name: "orgType",
            label: "Type"
          },{
            view: "text",
            readonly: true,
            name: "orgTypeTxt",
            label: "Type tekst"
          },{
            view: "checkbox",
            name: "notAdministrativeUnit",
            labelWidt: 0,
            labelRight: "Undtaget fra administrativt hierarki",
            tooltip: "Undtag enhed fra opbygning af administrativ organisation"
          },{
            view: "checkbox",
            name: "noUpdateOfAdministrativeParent",
            labelWidt: 0,
            labelRight: "Valgfri overenhed",
            tooltip: "Medtag ikke overenhed ved opbygning af administrativ organisation"
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
      if (!value.snapshot.notAdministrativeUnit && object.snapshot.notAdministrativeUnit === undefined) {
        delete value.snapshot.notAdministrativeUnit;
      }
      if (!value.snapshot.noUpdateOfAdministrativeParent && object.snapshot.noUpdateOfAdministrativeParent === undefined) {
        delete value.snapshot.noUpdateOfAdministrativeParent;
      }
      return value;
    },
    setValue: function(object) {
      if (object) {
        this.config.object = object;
        wch.simpleSetValue.apply(this,[object]);
      }
    }
  }, webix.ui.form);
})