var gulp = require('gulp'),
    cp = require('child_process'),
    cmq = require('gulp-combine-media-queries'),
    runSequence = require('gulp-run-sequence'),
    minifyCss = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename'),
    filelog = require('gulp-filelog'),
    glob = require('glob-all'),
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


gulp.task('image-resize', function(){
    var source = 'source/**/images/r_*.{jpg,png}';
    var dist = 'source';

    // gulp.src('source/**/images/r_*.{jpg,png}', {base: 'source'})
    gulp.src(source)
    // .pipe(changed('build/**/r_*.{jpg,png}'))
    .pipe(changed(source))
    .pipe(imageResize({
        width : 1920,
        height: 500,
        crop: true
    }))
    // .pipe(rename(function (path) { path.basename += '-large'; }))
    .pipe(rename({suffix: '-large' }))
    .pipe(gulp.dest( dist ))
    .pipe(filelog());

    gulp.src(source)
    .pipe(changed(source))
    .pipe(imageResize({
        width : 800,
        height: 300,
        crop: true
    }))
    .pipe(rename({suffix: '-small' }))
    .pipe(gulp.dest( dist ))
    .pipe(filelog());
})


gulp.task (  'image-res' ,  function () { 
  var  SrcGlobs    =  glob.sync('source/**/images/'); 
  var  srcDir      =  'resp' ; 
  var  DstDir      =  '' ; 
  var  targetFile  =  '/r_*.{jpg,png}' ;

  var  resizeLarge  =  { 
    width        :  1920 , 
    height       :  500 , 
    gravity      :  'Center' , 
    crop         :  true 
  };

  var resizeSmall = {
    width        :  800 , 
    height       :  300 , 
    gravity      :  'Center' , 
    crop         :  true 
  };


  for ( var  Item  in  SrcGlobs )  { 
    var  SrcGlob  =  SrcGlobs [ Item ]  +  srcDir  +  targetFile ; 
    var  DstGlob  =  SrcGlobs [ Item ]  +  DstDir ;

    gulp.src(  SrcGlob  ) 
      .pipe( changed (  DstGlob  )) 
      .pipe( imageResize (  resizeLarge  )) 
      .pipe( rename({suffix: '-large'}))
      .pipe( gulp.dest (  DstGlob  )) 
      .pipe( filelog ()); 

     gulp.src(  SrcGlob  ) 
      .pipe( changed (  DstGlob  )) 
      .pipe( imageResize (  resizeSmall  )) 
      .pipe( rename({suffix: '-small'}))
      .pipe( gulp.dest (  DstGlob  )) 
      .pipe( filelog ()); 
        
  } 
});





//glowne
gulp.task('default', function (cb) {
    runSequence(
        'image-res',
        'middleman-build',
        'css', 
    cb);
});
