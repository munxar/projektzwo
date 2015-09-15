/// <reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
// load it
import "angular-material";
import {AppController} from "./AppController";

// define app module and dependencies
angular.module("App", ["ngMaterial"])
    .controller("AppCtrl", AppController)
;

// bootstrap the application
angular.bootstrap(document, ["App"]);
