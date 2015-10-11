///<reference path="../../typings/tsd.d.ts"/>
var angular = require("angular");
require("angular-material");
require("angular-ui-router");
require("font-awesome");
//import "./style.css!css";
require("./main.css!css");
var main_config_1 = require("./main.config");
require("../lib/npm/material-design-icons-iconfont@2.0.3/dist/material-design-icons.css!css");
var Cell = (function () {
    function Cell(value) {
        if (value === void 0) { value = null; }
        this.value = value;
    }
    return Cell;
})();
var Block = (function () {
    function Block() {
        this.rows = [];
        for (var i = 0; i < 3; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                row.push(new Cell());
            }
            this.rows.push(row);
        }
    }
    return Block;
})();
var Grid = (function () {
    function Grid() {
        this.cells = [];
    }
    return Grid;
})();
// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .directive("grid", function () {
    return {
        replace: true,
        templateUrl: "app/grid.html",
        controllerAs: "ctrl",
        controller: function ($scope, $element) {
            var _this = this;
            this.onFocus = function (cell) {
                this.selectedCell = cell;
            };
            $element.bind("keydown", function (e) {
                console.log(e.keyCode);
                var val = e.keyCode - 48;
                if (val >= 1 && val <= 9) {
                    _this.selectedCell.value = val;
                    $scope.$apply();
                }
                if (e.keyCode == 8) {
                    _this.selectedCell.value = null;
                    $scope.$apply();
                    e.preventDefault();
                }
            });
            this.blockrows = [];
            for (var j = 0; j < 3; j++) {
                var row = [];
                for (var i = 0; i < 3; i++) {
                    row.push(new Block());
                }
                this.blockrows.push(row);
            }
            this.select = function (cell) {
                this.selectedCell = cell;
            };
            this.isSelected = function (cell) {
                return cell == this.selectedCell;
            };
            this.rows = [];
            for (var i = 0; i < 9; i++) {
                this.rows.push(new Cell(i + 1));
            }
            this.rows.push(new Cell(" "));
            this.sel = function (cell) {
                _this.selectedCell.value = cell.value;
            };
        }
    };
})
    .config(main_config_1.config);
angular.bootstrap(document, ["App"]);
//# sourceMappingURL=main.js.map