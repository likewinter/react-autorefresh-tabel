var gulp   = require('gulp');
var less   = require('gulp-less');
var concat = require('gulp-concat');

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

gulp.task('install', ['bootstrap:css', 'bootstrap:fonts', 'less']);
