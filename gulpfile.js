var gulp = require("gulp");
var jshint = require("gulp-jshint");
var exec = require("gulp-exec");

gulp.task("lint", function() {
    gulp.src("./app/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("server", ["lint"]);