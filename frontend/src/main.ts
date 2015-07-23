/// <reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import {AppController} from "./AppController";

// define app module
angular.module("App", [])
    .controller("AppCtrl", AppController)
;

// bootstrap the application
angular.bootstrap(document, ["App"]);
