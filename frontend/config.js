/**
 * System.js Config File
 */

System.config({
    defaultJSExtensions: true,
    transpiler: null,
    paths: {
        "angular": "/lib/angular/angular.js",
        "angular-material": "lib/angular-material/angular-material.js",
        "angular-animate": "lib/angular-animate/angular-animate.js",
        "angular-aria": "lib/angular-aria/angular-aria.js"
    },
    meta: {
      "angular": {
        exports: "angular"
      },
      "angular-animate": {
        deps: ["angular"]
      },
      "angular-aria": {
        deps: ["angular"]
      },
      "angular-material": {
        deps: ["angular", "angular-animate", "angular-aria"]
      }
    }
});

