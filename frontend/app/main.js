///<reference path="../../typings/tsd.d.ts"/>
var angular = require("angular");
require("angular-material");
require("angular-ui-router");
require("font-awesome");
//import "./style.css!css";
require("./main.css!css");
var main_config_1 = require("./main.config");
require("../lib/npm/material-design-icons-iconfont@2.0.3/dist/material-design-icons.css!css");
// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .config(main_config_1.config);
angular.bootstrap(document, ["App"]);
