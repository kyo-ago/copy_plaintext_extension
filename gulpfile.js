"use strict";
var gulp = require('gulp');

gulp.task('bump', function () {
    var bump = require('gulp-bump');
    var path = require('path');
    ['*.json', 'extension/*.json'].forEach(function (file) {
        gulp.src(file)
            .pipe(bump())
            .pipe(gulp.dest(path.dirname(file)))
        ;
    });
});

gulp.task('zip', function () {
    var zip = require('gulp-zip');
    var merge = require('event-stream').merge;
    return merge(
        gulp.src([
            'extension/**',
            '!extension/bower_components/**'
        ], { base: process.cwd() }),
        gulp.src([
            'extension/bower_components/react/react.js',
            'extension/bower_components/react-router/dist/react-router.js'
        ], { base: process.cwd() })
    )
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('browserify', function () {
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');

    ['background', 'content_scripts'].forEach(function (file) {
        browserify({
            'entries': ['./src/'+file+'/index.js']
        })
            .bundle()
            .pipe(source(file+'.js'))
            .pipe(gulp.dest('./extension/js/'))
        ;
    });
});
gulp.task('default', ['browserify']);
gulp.task('watch', ['browserify']);
