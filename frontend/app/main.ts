///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "font-awesome";
//import "./style.css!css";
import {config} from "./main.config";

// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .config(config)
;

angular.bootstrap(document, ["App"]);
