///<reference path="../../typings/tsd.d.ts"/>

export function config($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    // if no matching route, go to /
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("base", {
        abstract: true,
        templateUrl: "app/main.layout.html"
    }).state("home", {
        parent: "base",
        url: "/",
        templateUrl: "app/home/home.html"
    }).state("single", {
        parent: "base",
        url: "/single",
        controller: function() {
            this.cells = [];
            for(var i=0; i<81; i++) {
                this.cells.push({ title: i%9 });
            }
        },
        controllerAs: "ctrl",
        templateUrl: "app/single/single.html"
    }).state("multi", {
        parent: "base",
        url: "/multi",
        templateUrl: "app/multi/multi.html"
    }).state("about", {
        parent: "base",
        url: "/about",
        templateUrl: "app/about/about.html"
    })
}
