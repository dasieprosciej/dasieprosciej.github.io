module.exports = function(grunt) {
  grunt.initConfig({
    imageoptim: {
      png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['source/**/*.png']
      },
      // jpg: {
      //   options: {
      //     jpegMini: true,
      //     imageAlpha: false,
      //     quitAfter: true
      //   },
      //   src: ['source/**/images/img-*.{jpg,jpeg}']
      //   // src: ['source/**/uslugi-1.jpg']
      // }
    }
  });
  grunt.loadNpmTasks('grunt-imageoptim');
};