var gulp = require('gulp'),
    cp = require('child_process'),
    cmq = require('gulp-combine-media-queries'),
    runSequence = require('run-sequence'),
    minifyCss = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    rename = require('gulp-rename'),
    filelog = require('gulp-filelog'),
    glob = require('glob-all'),
    // plumber = require('gulp-plumber'),
    responsive = require('gulp-responsive'),
    del = require('del'),
    cache = require('gulp-cache'),
    newer = require('gulp-newer'),
    moz = require('imagemin-mozjpeg'),
    // typeset = require('gulp-typeset'),
    sass = require('gulp-sass');

var path = require('path');

// dla pluginu z grunt
require('gulp-grunt')(gulp);

gulp.task('grunt-images', function() {
    gulp.start('grunt-imageoptim');
});


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




gulp.task( 'regenerate', function(){
  var src = ['source/projekty/**/images/img-*.{jpg,jpeg,png}', 'source/blog/**/images/img-*.{jpg,png,jpeg}'];

  del(src);
  // del(src, function (err, paths) {
  //   console.log('Deleted files/folders:\n', paths.join('\n'));
  // });

})



gulp.task ('responsive', function(){
    var  SrcGlobs    =  glob.sync('source/**/'); 
    var  srcDir      =  'original' ; 
    var  DstDir      =  'images' ; 
    var  targetFile  =  '/*.{jpg,jpeg,png}' ;
    var rozmiar =
    [
      {
        "name" : "-xs",
        "width" : "400"
      },
      {
        "name" : "-s",
        "width" : "800"
      },
      {
        "name" : "-l",
        "width" : "1400"
      },
      {
        "name" : "-xl",
        "width" : "1920"
      }
    ];
    
    
  for ( var  Item  in  SrcGlobs )  { 
    var  SrcGlob  =  SrcGlobs [ Item ]  +  srcDir  +  targetFile ; 
    var  DstGlob  =  SrcGlobs [ Item ]  +  DstDir ;

    rozmiar.forEach(function(obj) {

      gulp.src(SrcGlob)
      .pipe(newer({
        dest: DstGlob,
        map: function(pathDir) {
          pathDir = 
            path.dirname(pathDir) + '/img-' +
            path.basename(pathDir, path.extname(pathDir)) + obj.name +
            path.extname(pathDir);
          return pathDir;  
        }
        }))  
      .pipe(responsive({
        '**/*.{jpg,jpeg,png}' : 
          [
            {
              width: obj.width,
              rename: {
                prefix: 'img-',
                suffix: obj.name
              }
            }
          ]
      },
      {
        errorOnUnusedConfig: false,
        errorOnUnusedImage: false,
        errorOnEnlargement: false,
        skipOnEnlargement: true,
        progressive: true
      }

      ))
      .pipe( gulp.dest (  DstGlob ))
      .pipe(filelog());
    }) //zamkniecie drugiego for
  } //zamkniecie for
});


gulp.task('watch-images', function(){
  gulp.watch('source/**/original/*.{jpg,jpeg,png}', ['responsive'])
})


gulp.task('images', function (cb) {
    runSequence(
        'regenerate',
        'responsive',
    cb);
});


//glowne
gulp.task('default', function (cb) {
    runSequence(
        'responsive',
        'middleman-build',        
        'css', 
    cb);
});

// gulp.task('typeset', function () {
//     return gulp.src('build/blog/**/*.html')
//         .pipe(typeset())
//         .pipe(gulp.dest('build/blog'));
// });


// produckja dodatkowo optymalizuje images w buildzie, a moze lepiej w source -> wtedy middleman build nie nadpisze zoptymalizowanych img
gulp.task('production', function (cb) {
    runSequence(
        'images',
        'middleman-build',
        'grunt-images',
        'css', 
    cb);
});
