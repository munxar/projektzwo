System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "none",
  paths: {
    "github:*": "lib/github/*"
  },
  map: {
    "angular": "github:angular/bower-angular@1.4.6",
    "angular-material": "github:angular/bower-material@0.11.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "css": "github:systemjs/plugin-css@0.1.18",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-angular-animate@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-angular-aria@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-material@0.11.1": {
      "angular": "github:angular/bower-angular@1.4.6",
      "angular-animate": "github:angular/bower-angular-animate@1.4.6",
      "angular-aria": "github:angular/bower-angular-aria@1.4.6",
      "css": "github:systemjs/plugin-css@0.1.18"
    }
  }
});
