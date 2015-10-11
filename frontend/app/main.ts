///<reference path="../../typings/tsd.d.ts"/>
import * as angular from "angular";
import "angular-material";
import "angular-ui-router";
import "font-awesome";
//import "./style.css!css";
import "./main.css!css";
import {config} from "./main.config";
import "../lib/npm/material-design-icons-iconfont@2.0.3/dist/material-design-icons.css!css";

class Cell {
    constructor(public value = null) {}
}

class Block {
    rows = [];
    constructor() {
        for(var i=0; i<3; i++) {
            var row = [];
            for(var j=0; j<3; j++) {
                row.push(new Cell());
            }
            this.rows.push(row);
        }
    }
}

class Grid {
    cells: Cell[] = [];
    constructor() {

    }
}

// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .directive("grid", function() {
        return {
            replace: true,
            templateUrl: "app/grid.html",
            controllerAs: "ctrl",
            controller: function($scope, $element) {
                this.onFocus = function(cell) {
                    this.selectedCell = cell;
                };

                $element.bind("keydown", (e) => {
                    console.log(e.keyCode);

                    var val = e.keyCode - 48;
                    if(val >= 1 && val <= 9) {
                        this.selectedCell.value = val;
                        $scope.$apply();
                    }
                    if(e.keyCode == 8) {
                        this.selectedCell.value = null;
                        $scope.$apply();
                        e.preventDefault();
                    }
                });
                this.blockrows = [];
                for(var j=0; j<3; j++) {
                    var row = [];
                    for(var i=0; i<3; i++) {
                        row.push(new Block());
                    }
                    this.blockrows.push(row);
                }
                this.select = function(cell) {
                    this.selectedCell = cell;
                };
                this.isSelected = function(cell) {
                    return cell == this.selectedCell;
                };
                this.rows = [];
                for(var i=0; i<9; i++) {
                    this.rows.push(new Cell(i+1));
                }
                this.rows.push(new Cell(" "));
                this.sel = (cell) => {
                    this.selectedCell.value = cell.value;
                };
            }
        }
    })
    /*
    .directive("cell", function() {
        return {
            scope: { value: "=" },
            replace: true,
            template: "<div class='cell' tabindex='0'>{{value}}</div>",
            controller: function($scope, $element) {

                $element.bind("keydown", (e) => {
                    var val = e.keyCode - 48;
                    if(val >= 1 && val <= 9) {
                        $scope.value = val;
                        $scope.$apply();
                    }
                    if(e.keyCode == 8) {
                        $scope.value = "";
                        $scope.$apply();
                        e.preventDefault();
                    }
                });

                $scope.$on("$destroy", function() {
                    $element.unbind("keydown");
                });
            }

        }
    })
    */
    .config(config)
;

angular.bootstrap(document, ["App"]);
