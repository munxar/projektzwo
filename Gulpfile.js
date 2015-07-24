var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var proxyMiddleware = require("http-proxy-middleware");
var ts = require("gulp-typescript");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var typescript = require("typescript");
var del = require("del");
var spawn = require("child_process").spawn;
var config = require("./config");
var baseDir = "./frontend";
var frontendSrc = "frontend/src/";
var backendSrc = "backend/";

var tsFrontend = ts.createProject({
    typescript: typescript,
    target: "es5",
    module: "commonjs"
});

var tsBackend = ts.createProject({
    typescript: typescript,
    target: "es5",
    module: "commonjs"
});

function backend() {
    var server;

    return {
        restart: function() {
            var msgString = "[backend]: %s";
            console.info(msgString, "restarted");
            if(server) {
                server.kill("SIGKILL");
            }
            // spawn backend process, redirect stdio to gulp process
            server = spawn('node', [backendSrc + "src/main.js"], { stdio: 'inherit' });
        }
    };
}

var server = backend();

gulp.task("serve", ["build:back", "build:front", "build:sass"], function(done) {
    var proxy = proxyMiddleware(config.api, { target: "http://127.0.0.1:" + config.port });

    // start browser sync server but redirect /api to backend
    browserSync.init({
        server: {
            baseDir: baseDir,
            middleware: [proxy]
        }
    });

    server.restart();
    done();
});

// build frontend
gulp.task("build:front", function() {
    return gulp.src(frontendSrc + "**/*.ts")
        .pipe(ts(tsFrontend))
        .pipe(gulp.dest(frontendSrc))
        .pipe(browserSync.stream());
});

// build backend
gulp.task("build:back", function() {
    return gulp.src(backendSrc + "**/*.ts")
        .pipe(ts(tsBackend))
        .pipe(gulp.dest(backendSrc));
});


gulp.task("build:sass", function() {
    return gulp.src(frontendSrc + "**/*.scss")
        .pipe(autoprefixer({
            browser: ["last 2 versions", "IE 9", "> 5%", "Firefox ESR"],
            cascade: false
        }))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(frontendSrc));
});

// watch typescript
gulp.task("watch", ["build:back", "build:front", "build:sass"], function() {

    // watch ts files an trigger build chain
    gulp.watch([frontendSrc + "**/*.ts"], ["build:front"]);
    gulp.watch([frontendSrc + "**/*.scss"], ["build:sass"]);
    gulp.watch([backendSrc + "**/*.ts"], ["build:back"]);

    // watch all html, js and css files -> reload browser on change
    gulp.watch([baseDir + "/**/*.html", baseDir + "/**/*.js", baseDir + "/**/*.css"], once(browserSync.reload));

    // on change of a backend js, restart backend
    gulp.watch([backendSrc + "**/*.js"], once(server.restart));
});

// collect events, and start cb only once after a timeout
function once(cb, timeout) {
    timeout = timeout || 100;
    var timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(cb, timeout);
    }
}

// remove generated js files
gulp.task("clean", function(done) {
    del([backendSrc + "**/*.js", frontendSrc + "**/*.js", frontendSrc + "**/*.css"], done);
});

gulp.task("default", ["clean", "build:back", "build:front", "serve", "watch"]);
