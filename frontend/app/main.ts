///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "font-awesome";
//import "./style.css!css";
import "./main.css!css";
import {config} from "./main.config";
import "../lib/npm/material-design-icons-iconfont@2.0.3/dist/material-design-icons.css!css";

// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .config(config)
;

angular.bootstrap(document, ["App"]);
