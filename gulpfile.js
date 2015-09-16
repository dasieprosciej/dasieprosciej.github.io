var gulp = require('gulp'),
    cp = require('child_process'),
    cmq = require('gulp-combine-media-queries'),
    runSequence = require('run-sequence'),
    minifyCss = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename'),
    filelog = require('gulp-filelog'),
    glob = require('glob-all'),
    plumber = require('gulp-plumber'),
    responsive = require('gulp-responsive'),
    del = require('del'),
    cache = require('gulp-cache'),
    newer = require('gulp-newer'),
    moz = require('imagemin-mozjpeg'),
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



gulp.task ('responsive-s', function(){
    var  SrcGlobs    =  glob.sync('source/**/'); 
    var  srcDir      =  'original' ; 
    var  DstDir      =  'images' ; 
    var  targetFile  =  '/*.{jpg,png}' ;

    //jesli w tym samym katalogu
    // var dist = '.'; 
    // gulp.src(  src, { base: './' }  ) 

    for ( var  Item  in  SrcGlobs )  { 
    var  SrcGlob  =  SrcGlobs [ Item ]  +  srcDir  +  targetFile ; 
    var  DstGlob  =  SrcGlobs [ Item ]  +  DstDir ;


    gulp.src(SrcGlob)
    .pipe(newer({
      dest: DstGlob,
      map: function(pathDir) {
        pathDir = 
          path.dirname(pathDir) + '/img-' +
          path.basename(pathDir, path.extname(pathDir)) + '-s' +
          path.extname(pathDir);
        return pathDir;  
      }
      }))  
    .pipe(filelog())
    .pipe(responsive({
      '**/*.jpg' : 
        [
          {
            width: 800,

            rename: {
              prefix: 'img-',
              suffix: '-s'
            }
          }
          // {
          //   width: 1500,
          //   rename: {
          //     prefix: 'img-',
          //     suffix: '-l'
          //   }
          // },
          // {
          //   width: 2000,
          //   rename: {
          //     prefix: 'img-',
          //     suffix: '-xl'
          //   }
          // },
          // {
          //   width: 600,
          //   height: 400,
          //   crop: true,
          //   rename: {
          //     prefix: 'img-',
          //     suffix: '-thumbnail'
          //   }
          // }
        ]
    },
    {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false,
      skipOnEnlargement: true
    }

    ))
    .pipe( gulp.dest (  DstGlob ))
    .pipe(filelog());

 } //zamkniecie for
});

gulp.task ('responsive-l', function(){
    var  SrcGlobs    =  glob.sync('source/**/'); 
    var  srcDir      =  'original' ; 
    var  DstDir      =  'images' ; 
    var  targetFile  =  '/*.{jpg,png}' ;

    for ( var  Item  in  SrcGlobs )  { 
    var  SrcGlob  =  SrcGlobs [ Item ]  +  srcDir  +  targetFile ; 
    var  DstGlob  =  SrcGlobs [ Item ]  +  DstDir ;


    gulp.src(SrcGlob)
    .pipe(newer({
      dest: DstGlob,
      map: function(pathDir) {
        pathDir = 
          path.dirname(pathDir) + '/img-' +
          path.basename(pathDir, path.extname(pathDir)) + '-l' +
          path.extname(pathDir);
        return pathDir;  
      }
      }))  
    .pipe(filelog())
    .pipe(responsive({
      '**/*.jpg' : 
        [
          {
            width: 1500,
            rename: {
              prefix: 'img-',
              suffix: '-l'
            }
          }
        ]
    },
    {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false,
      skipOnEnlargement: true
    }

    ))
    .pipe( gulp.dest (  DstGlob ))
    .pipe(filelog());

 } //zamkniecie for
});

gulp.task ('responsive-xl', function(){
    var  SrcGlobs    =  glob.sync('source/**/'); 
    var  srcDir      =  'original' ; 
    var  DstDir      =  'images' ; 
    var  targetFile  =  '/*.{jpg,png}' ;

    for ( var  Item  in  SrcGlobs )  { 
    var  SrcGlob  =  SrcGlobs [ Item ]  +  srcDir  +  targetFile ; 
    var  DstGlob  =  SrcGlobs [ Item ]  +  DstDir ;


    gulp.src(SrcGlob)
    .pipe(newer({
      dest: DstGlob,
      map: function(pathDir) {
        pathDir = 
          path.dirname(pathDir) + '/img-' +
          path.basename(pathDir, path.extname(pathDir)) + '-xl' +
          path.extname(pathDir);
        return pathDir;  
      }
      }))  
    .pipe(filelog())
    .pipe(responsive({
      '**/*.jpg' : 
        [
          {
            width: 2000,
            rename: {
              prefix: 'img-',
              suffix: '-xl'
            }
          }
        ]
    },
    {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false,
      skipOnEnlargement: true
    }

    ))
    .pipe( gulp.dest (  DstGlob ))
    .pipe(filelog());

 } //zamkniecie for
});


gulp.task('responsive', ['responsive-s', 'responsive-l', 'responsive-xl']);

// gulp.task ('dupa', function(){
//     var  src    =  'source/**/original/*.jpg'; 

//     gulp.src(src)
//     .pipe(filelog())
//     .pipe(responsive({
//       '**/*.jpg' : 
//         [
//           {
//             width: 800,

//             rename: {
//               prefix: 'img-',
//               suffix: '-s'
//             }
//           },
//           {
//             width: 1500,
//             rename: {
//               prefix: 'img-',
//               suffix: '-l'
//             }
//           },
//           {
//             width: 2000,
//             rename: {
//               prefix: 'img-',
//               suffix: '-xl'
//             }
//           },
//           {
//             width: 600,
//             height: 400,
//             crop: true,
//             rename: {
//               prefix: 'img-',
//               suffix: '-thumbnail'
//             }
//           }
//         ]
//     },
//     {
//       errorOnUnusedConfig: false,
//       errorOnUnusedImage: false,
//       errorOnEnlargement: false,
//       skipOnEnlargement: true
//     }

//     ))
//     .pipe(rename(function(path){
//       path.basename = '../dupa/' + path.basename;
//     }))
//     .pipe(gulp.dest(function(file){
//       return file.base;
//     }))
//     .pipe(filelog());
// });

// gulp.task('moz', function () {
//     return gulp.src('source/**/images/img-*.{jpg,jpeg}')
//         .pipe(moz({quality: 80})())
//         .pipe(gulp.dest('./dest'));
// });




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


// produckja dodatkowo optymalizuje images w buildzie, a moze lepiej w source -> wtedy middleman build nie nadpisze zoptymalizowanych img
gulp.task('production', function (cb) {
    runSequence(
        'images',
        'middleman-build',
        'grunt-images',
        'css', 
    cb);
});
