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
    items:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    constructor(public value = null) {
    }
}

class CellContainer {
    constructor(public cells:Cell[] = []) {
    }
}

class Row extends CellContainer {
}

class Column extends CellContainer {
}

class Block extends CellContainer {
    rows:Cell[][] = [];

    constructor(cells:Cell[]) {
        super(cells);
        for (let i = 0; i < 3; i++) {
            this.rows.push(cells.slice(i * 3, (i + 1) * 3));
        }
    }
}

class Grid {
    cells:Cell[] = [];
    rows:Row[] = [];
    columns:Column[] = [];
    blocks:Block[] = [];

    constructor() {
        let columnSize = 9;
        let rowSize = 9;
        let size = rowSize * columnSize;

        for (let i = 0; i < size; i++) {
            var cell = new Cell();
            cell.value = i;
            this.cells.push(cell);
        }

        for (let rowIndex = 0; rowIndex < rowSize; rowIndex++) {
            this.rows.push(new Row(this.cells.slice(rowIndex * rowSize, (rowIndex + 1) * rowSize)));
        }

        for (let blockIndex = 0; blockIndex < rowSize; blockIndex++) {
            let i = blockIndex % 3;
            let j = Math.floor(blockIndex / 3);

            var x = i * 3 + j * 27;
            let start = (s, off = 0) => s + off * 9;
            let end = s => s + 3;

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
}

// define main app module
angular
    .module("App", ["ngMaterial", "ui.router"])
    .directive("grid", function () {
        return {
            replace: true,
            templateUrl: "app/grid.html",
            controllerAs: "ctrl",
            controller: GridController
        }
    })
    .config(config)
;

class GridController {
    grid = new Grid();
    rows: Block[][] = [];
    selectedCell: Cell;

    constructor($scope, $element) {
        this.selectedCell = this.grid.cells[0];
        $element.focus();

        $element.bind("keydown", (e) => {
            //console.log(e.keyCode);

            var val = e.keyCode - 48;
            if (val >= 1 && val <= 9) {
                this.selectedCell.value = val;
                $scope.$apply();
                e.preventDefault();
            }
            if (e.keyCode == 8) {
                this.selectedCell.value = null;
                $scope.$apply();
                e.preventDefault();
            }
            // left
            if (e.keyCode == 37) {
                this.move(8,0);
                $scope.$apply();
                e.preventDefault();
            }
            // right
            if (e.keyCode == 39) {
                this.move(1,0);
                $scope.$apply();
                e.preventDefault();
            }
            // up
            if (e.keyCode == 38) {
                this.move(0,8);
                $scope.$apply();
                e.preventDefault();
            }
            // down
            if (e.keyCode == 40) {
                this.move(0,1);
                $scope.$apply();
                e.preventDefault();
            }
        });

        for (let i = 0; i < 3; i++) {
            this.rows.push(this.grid.blocks.slice(i * 3, (i + 1) * 3));
        }
    }

    move(x: number, y: number) {
        var idx = this.grid.cells.indexOf(this.selectedCell);
        var px = idx%9;
        var py = Math.floor(idx/9);
        idx = ((px + x)%9) + ((py + y)%9)*9;
        this.selectedCell = this.grid.cells[idx];
    }

    onFocus(cell) {
        this.selectedCell = cell;
    }

    select(cell) {
        this.selectedCell = cell;
    };

    isSelected(cell) {
        return cell == this.selectedCell;
    };

    sel = cell => {
        this.selectedCell.value = cell.value;
    };
}

angular.bootstrap(document, ["App"]);
