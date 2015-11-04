var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        this.items = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    return Cell;
})();
var CellContainer = (function () {
    function CellContainer(cells) {
        if (cells === void 0) { cells = []; }
        this.cells = cells;
    }
    return CellContainer;
})();
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        _super.apply(this, arguments);
    }
    return Row;
})(CellContainer);
var Column = (function (_super) {
    __extends(Column, _super);
    function Column() {
        _super.apply(this, arguments);
    }
    return Column;
})(CellContainer);
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(cells) {
        _super.call(this, cells);
        this.rows = [];
        for (var i = 0; i < 3; i++) {
            this.rows.push(cells.slice(i * 3, (i + 1) * 3));
        }
    }
    return Block;
})(CellContainer);
var Grid = (function () {
    function Grid() {
        this.cells = [];
        this.rows = [];
        this.columns = [];
        this.blocks = [];
        var columnSize = 9;
        var rowSize = 9;
        var size = rowSize * columnSize;
        for (var i = 0; i < size; i++) {
            var cell = new Cell();
            cell.value = i;
            this.cells.push(cell);
        }
        for (var rowIndex = 0; rowIndex < rowSize; rowIndex++) {
            this.rows.push(new Row(this.cells.slice(rowIndex * rowSize, (rowIndex + 1) * rowSize)));
        }
        for (var blockIndex = 0; blockIndex < rowSize; blockIndex++) {
            var i = blockIndex % 3;
            var j = Math.floor(blockIndex / 3);
            var x = i * 3 + j * 27;
            var start = function (s, off) {
                if (off === void 0) { off = 0; }
                return s + off * 9;
            };
            var end = function (s) { return s + 3; };
            var s1 = start(x, 0);
            var s2 = start(x, 1);
            var s3 = start(x, 2);
            var e1 = end(s1);
            var e2 = end(s2);
            var e3 = end(s3);
            var cell1 = this.cells.slice(s1, e1);
            var cell2 = this.cells.slice(s2, e2);
            var cell3 = this.cells.slice(s3, e3);
            this.blocks.push(new Block(cell1.concat(cell2).concat(cell3)));
        }
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
        controller: GridController
    };
})
    .config(main_config_1.config);
var GridController = (function () {
    function GridController($scope, $element) {
        var _this = this;
        this.grid = new Grid();
        this.rows = [];
        this.sel = function (cell) {
            _this.selectedCell.value = cell.value;
        };
        this.selectedCell = this.grid.cells[0];
        $element.focus();
        $element.bind("keydown", function (e) {
            //console.log(e.keyCode);
            var val = e.keyCode - 48;
            if (val >= 1 && val <= 9) {
                _this.selectedCell.value = val;
                $scope.$apply();
                e.preventDefault();
            }
            if (e.keyCode == 8) {
                _this.selectedCell.value = null;
                $scope.$apply();
                e.preventDefault();
            }
            // left
            if (e.keyCode == 37) {
                _this.move(8, 0);
                $scope.$apply();
                e.preventDefault();
            }
            // right
            if (e.keyCode == 39) {
                _this.move(1, 0);
                $scope.$apply();
                e.preventDefault();
            }
            // up
            if (e.keyCode == 38) {
                _this.move(0, 8);
                $scope.$apply();
                e.preventDefault();
            }
            // down
            if (e.keyCode == 40) {
                _this.move(0, 1);
                $scope.$apply();
                e.preventDefault();
            }
        });
        for (var i = 0; i < 3; i++) {
            this.rows.push(this.grid.blocks.slice(i * 3, (i + 1) * 3));
        }
    }
    GridController.prototype.move = function (x, y) {
        var idx = this.grid.cells.indexOf(this.selectedCell);
        var px = idx % 9;
        var py = Math.floor(idx / 9);
        idx = ((px + x) % 9) + ((py + y) % 9) * 9;
        this.selectedCell = this.grid.cells[idx];
    };
    GridController.prototype.onFocus = function (cell) {
        this.selectedCell = cell;
    };
    GridController.prototype.select = function (cell) {
        this.selectedCell = cell;
    };
    ;
    GridController.prototype.isSelected = function (cell) {
        return cell == this.selectedCell;
    };
    ;
    return GridController;
})();
angular.bootstrap(document, ["App"]);
