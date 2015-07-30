var gulp = require('gulp'),
    cp = require('child_process'),
    cmq = require('gulp-combine-media-queries'),
    runSequence = require('gulp-run-sequence'),
    minifyCss = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');



gulp.task('middleman-build', function (done) {
    return cp.spawn('middleman', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('css', function () {
    gulp.src('build/css/*.css')
    .pipe(autoprefixer('last 2 version', 'ie 9', 'opera 12.1', 'ios 7', 'android 4'))
    .pipe(cmq())
    .pipe(gulp.dest('build/css-dev'))
    .pipe(minifyCss({
        keepSpecialComments:1
    }))
    .pipe(gulp.dest('build/css'));
});



gulp.task('middleman-rebuild', ['middleman-build'], function () {
    browserSync.reload();
});


gulp.task('browser-sync', ['middleman-build'], function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});

// gulp.task('watch', function () {
//     gulp.watch(['source/**/*.*'], ['middleman-rebuild']);
// });

gulp.task('watch', function () {
    gulp.watch(['source/**/*.*'], ['default']);
});


//do testowania mobile
// gulp.task('remote', ['browser-sync', 'watch']);

gulp.task('remote', function (cb) {
    runSequence(
        'browser-sync',
        'css',
        'watch', 
    cb);
});


//glowne
gulp.task('default', function (cb) {
    runSequence(
        'middleman-build',
        'css', 
    cb);
});
