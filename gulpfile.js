var gulp = require('gulp');
var jshint = require('gulp-jshint');
var exec = require('gulp-exec');
var gulpif = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var argv = require('yargs').argv;
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var bowerMain = require('bower-main');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var merge2 = require('merge2');
var runSequence = require('run-sequence');

var prod = !!argv.prod;

gulp.task('lint', function () {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('inject', function () {
    var options = {read: false, cwd: __dirname + '/public'};
    var custom = gulp.src(['./public/build/js/**/*.js', './public/build/css/**/*.css'], {read: false});
    var bowerFiles = bowerMain('js', 'min.js', 'css', 'min.css');
    var vendor = prod
        ? merge2(gulp.src(bowerFiles.minified, options), gulp.src(bowerFiles.minifiedNotFound, options))
        : gulp.src(bowerFiles.normal, options);

    return gulp.src('./public/index.html')
        .pipe(inject(vendor, {name: 'bower'}))
        .pipe(inject(custom, {ignorePath: '/public'}))
        .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function () {
    return gulp.src('./public/js/**/*.js')
        .pipe(gulpif(prod, concat('app.js')))
        .pipe(gulpif(prod, ngAnnotate()))
        .pipe(gulpif(prod, uglify()))
        .pipe(gulpif(prod, rename({suffix: '.min'})))
        .pipe(gulp.dest('./public/build/js'));
});

gulp.task('style', function () {
    return gulp.src('./public/style/**/*.css')
        .pipe(gulpif(prod, concat('main.css')))
        .pipe(gulpif(prod, rename({suffix: '.min'})))
        .pipe(gulp.dest('./public/build/css'));
});

gulp.task('clean', function () {
    return gulp.src('./public/build').pipe(clean());
});

gulp.task('server', ['lint']);

gulp.task('build', function (cb) {
    runSequence('clean', ['scripts', 'style'], 'inject', cb);
});

