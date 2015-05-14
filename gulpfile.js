var gulp = require('gulp');
var jshint = require('gulp-jshint');
var exec = require('gulp-exec');
var gulpif = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var argv = require('yargs').argv;
var inject = require('gulp-inject');
var bower = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var filter = require('gulp-filter');
var templateCache = require('gulp-angular-templatecache');

var prod = !!argv.prod;
var cwd = './public';

var path = {
    clean : cwd + '/build',
    ignore: '/public',
    target: {
        js : cwd + '/build/js',
        css : cwd + '/build/css',
        fonts: cwd + '/build/fonts',
        vendorProd: [
            cwd + '/build/js/vendor.min.js',
            cwd + '/build/css/vendor.min.css'
        ],
        customProd: [
            cwd + '/build/js/app.min.js',
            cwd + '/build/js/templates.min.js',
            cwd + '/build/css/app.min.css'
        ]
    },
    src : {
        appJs: [cwd + '/js/app.js', cwd + '/js/**/*.js' ],
        appStyle: cwd + '/style/**/*.css',
        fonts: [cwd + '/libs/bootstrap/fonts/**/*.*'],
        templates: cwd + '/templates/**/*.html'
    }
};

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

gulp.task('lint', function () {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    return gulp.src('./public/build').pipe(clean());
});

gulp.task('appScripts', function(){
    return gulp.src(path.src.appJs)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.target.js))
});

gulp.task('appStyle', function () {
    return gulp.src(path.src.appStyle)
        .pipe(gulpif(prod, concat('app.css')))
        .pipe(gulpif(prod, rename({suffix: '.min'})))
        .pipe(gulp.dest(path.target.css));
});

gulp.task('vendor', function(){
    var jsFilter = filterByExtension('js');

    return gulp.src(bower())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.target.js))
        .pipe(jsFilter.restore())
        .pipe(filterByExtension('css'))
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.target.css));
});

gulp.task('fonts', function(){
    gulp.src(path.src.fonts)
        .pipe(rename({directory: ''}))
        .pipe(gulp.dest(path.target.fonts));
});

gulp.task('templates', function(){
   return gulp.src(path.src.templates)
       .pipe(templateCache())
       .pipe(uglify())
       .pipe(rename('templates.min.js'))
       .pipe(gulp.dest(path.target.js));
});

gulp.task('inject:dev', function(){
    gulp.src(cwd + '/index.html')
        .pipe(inject(gulp.src(path.src.appJs, {read: false}), {ignorePath: path.ignore} ))
        .pipe(inject(gulp.src(path.target.css + '/**/*.css', {read: false}), {ignorePath: path.ignore}))
        .pipe(inject(gulp.src(bower(), {read:false}), {ignorePath: path.ignore, name: 'bower'}))
        .pipe(gulp.dest(cwd));
});

gulp.task('inject:prod', function(){
    var vendor = gulp.src(path.target.vendorProd, {read: false});
    var custom = gulp.src(path.target.customProd, {read: false});

    gulp.src(cwd + '/index.html')
        .pipe(inject(vendor, {ignorePath: path.ignore, name: 'bower'} ))
        .pipe(inject(custom, {ignorePath: path.ignore}))
        .pipe(gulp.dest(cwd));
});

gulp.task('server', ['lint']);

gulp.task('build:dev', function (cb) {
    runSequence('clean', 'appStyle', 'inject:dev', cb);
});

gulp.task('build:prod', function (cb) {
    runSequence('clean', ['appScripts', 'appStyle', 'vendor', 'templates'], ['inject:prod', 'fonts'], cb);
});

//TO DO: use .less instead of .css