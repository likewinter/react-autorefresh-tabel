var gulp       = require('gulp'),
    rename     = require('gulp-rename'),
    connect    = require('gulp-connect-php'),
    uglify     = require('gulp-uglify'),
    less       = require('gulp-less'),
    concat     = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    browserify = require('browserify'),
    to5ify    = require('6to5ify');

var scripts = {
    vendor: ['jquery', 'lodash', 'react'],
    app: ['resources/jsx/App.jsx']
}

gulp.task('browserify:app', function() {
    var b = browserify(scripts.app);

    scripts.vendor.forEach(function(script) {
        b.external(script);
    });

    return b
        .transform(to5ify.configure({extensions: ['.jsx', '.es6']}))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(livereload());
});

gulp.task('browserify:vendor', function() {
    var b = browserify();

    scripts.vendor.forEach(function(script) {
        b.require(script);
    });

    return b
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('app/js'))
});

gulp.task('bootstrap:css', function() {
    return gulp.src('node_modules/bootstrap/dist/css/*.min.css')
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('app/css'));
});

gulp.task('bootstrap:fonts', function() {
    return gulp.src('node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('less', function() {
    return gulp.src('resources/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    connect.server({
        base: 'app/'
    });

    livereload.listen();

    gulp.watch('resources/less/*.less', ['less']);
    gulp.watch('resources/jsx/*.jsx', ['browserify:app']);
    gulp.watch('app/index.html').on('change', livereload.changed);
});

gulp.task('install', ['bootstrap:css', 'bootstrap:fonts', 'browserify:app', 'browserify:vendor']);

gulp.task('default', ['watch']);
